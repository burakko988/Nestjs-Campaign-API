import { Types } from 'mongoose';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { IBasketItems } from '../order/order.schema';
import { BenefitType } from '../common/enum/benefit.enum';
import { CampaignRepository } from './campaign.repository';
import { CreateCampaignDto } from './dto/create.campaign.dto';
import { CampaignType } from '../common/enum/campaign.type.enum';
import { IMaxBenefitOuput } from './interface/IMaxBenefitOutput';
import { ICreateCampaignInput } from './interface/ICreaetCampaignInput';

@Injectable()
export class CampaignService {
    constructor(private readonly campaignRepository: CampaignRepository) {}

    /**
     * Create Campaign by Admin.
     *
     * @param dto
     * @returns
     */
    async createCampaign(dto: CreateCampaignDto) {
        try {
            const { campaignTitle, discountNumber, benefitType, campaignType, campaignRules } = dto;
            const input: ICreateCampaignInput = {
                campaignTitle,
                discountNumber,
                benefitType,
                campaignType,
                // Never Trust Front side :)
                campaignRules: {
                    author: campaignType === CampaignType.MIN_PRICE ? undefined : campaignRules.author,
                    category: campaignType === CampaignType.MIN_PRICE ? undefined : campaignRules.category,
                    minBasketPrice: campaignRules.minBasketPrice,
                },
            };
            return await this.campaignRepository.createCampaign(input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Calculated data one more process which is greater discount minPrice or oneBuyGetOne.
     * This func make this.
     *
     * @param basketItems
     * @param totalPrice
     * @returns
     */
    async getAvaibleCampagins(basketItems: IBasketItems[], totalPrice: number) {
        try {
            const minPriceCampaignMax = await this.minPriceCampaign(totalPrice);
            const buyOneGetOneCampaign = await this.getMaxBenefitOnBuyOneGetOne(basketItems);
            if (minPriceCampaignMax.discountValue > buyOneGetOneCampaign.discountValue) {
                return minPriceCampaignMax;
            }
            return buyOneGetOneCampaign;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Simple discount average calculate func.
     *
     * @param totalPrice
     * @returns
     */
    private async minPriceCampaign(totalPrice: number): Promise<IMaxBenefitOuput> {
        try {
            const availableCampaigns = await this.campaignRepository.minPriceCampaigns(totalPrice);

            if (availableCampaigns.length === 0) {
                return { campaignId: new Types.ObjectId('000000000000000000000000'), discountValue: 0 };
            }

            let max = 0;
            let maxCampaignId: Types.ObjectId = new Types.ObjectId('000000000000000000000000');

            for (const campaign of availableCampaigns) {
                let value = 0;

                if (campaign.benefitType === BenefitType.FIXED) {
                    value = campaign.discountNumber;
                } else {
                    value = (totalPrice * campaign.discountNumber) / 100;
                }

                if (value > max) {
                    max = value;
                    maxCampaignId = campaign._id;
                }
            }

            const maxPriceCampaign = { campaignId: maxCampaignId, discountValue: max };
            return maxPriceCampaign;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get avaible campaigns after that use on basketItems and select max value of discount...
     * I can't see any buyOneGetOne which books is free cheapes or most expensive and i have select most expensive.
     *
     * @param basketItems
     * @returns
     */
    async getMaxBenefitOnBuyOneGetOne(basketItems: IBasketItems[]): Promise<IMaxBenefitOuput> {
        try {
            const campaigns = await this.buyOneGetOneCampaigns(basketItems);
            if (!Array.isArray(campaigns) || !campaigns.length) {
                return { campaignId: new Types.ObjectId('000000000000000000000000'), discountValue: 0 };
            }

            let maxPriceCampaign = null;
            let maxPrice = 0;

            for (const campaign of campaigns) {
                if (!campaign || !campaign.campaignRules) {
                    continue;
                }

                const author = campaign.campaignRules.author;
                const category = campaign.campaignRules.category;

                let filteredBooks = [];

                if (author && category) {
                    filteredBooks = basketItems.filter((item) => item.author === author && item.category === category.toHexString());
                } else if (author) {
                    filteredBooks = basketItems.filter((item) => item.author === author);
                } else if (category) {
                    filteredBooks = basketItems.filter((item) => item.category === category.toHexString());
                }

                if (filteredBooks.length > 0) {
                    const maxPriceInFilteredBooks = Math.max(...filteredBooks.map((book) => book.price));
                    if (maxPriceInFilteredBooks > maxPrice) {
                        maxPrice = maxPriceInFilteredBooks;
                        maxPriceCampaign = { campaignId: campaign._id, discountValue: maxPrice };
                    }
                }
            }
            return maxPriceCampaign;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get campaigns for basket items and campaign rules.
     *
     * @param basketItems
     * @returns
     */
    private async buyOneGetOneCampaigns(basketItems: IBasketItems[]) {
        try {
            const authorCountMap = new Map<string, number>();
            const categoryCountMap = new Map<string, number>();

            basketItems.forEach((item) => {
                const { author, category, quantity } = item;

                if (!authorCountMap.has(author)) {
                    authorCountMap.set(author, 0);
                }
                if (!categoryCountMap.has(category)) {
                    categoryCountMap.set(category, 0);
                }

                authorCountMap.set(author, authorCountMap.get(author) + quantity);
                categoryCountMap.set(category, categoryCountMap.get(category) + quantity);
            });

            let hasSameCategoryAndAuthor = false;
            const sameCategory = [];
            const sameAuthor = [];

            for (const item of basketItems) {
                const { author, category } = item;

                if (authorCountMap.get(author) >= 2) {
                    sameAuthor.push(author);
                }

                if (categoryCountMap.get(category) >= 2) {
                    sameCategory.push(category);
                }

                if (authorCountMap.get(author) >= 2 && categoryCountMap.get(category) >= 2) {
                    hasSameCategoryAndAuthor = true;
                }
            }
            const nonDuplicateCategory = [...new Set(sameCategory)];
            const nonDuplicateAuthor = [...new Set(sameAuthor)];

            const dbResponse = await this.campaignRepository.buyOneGetOneCampaigns(hasSameCategoryAndAuthor, nonDuplicateAuthor, nonDuplicateCategory);

            const mergedData = dbResponse.both.concat(dbResponse.singleAuthor).concat(dbResponse.singleCategory);

            return mergedData;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
