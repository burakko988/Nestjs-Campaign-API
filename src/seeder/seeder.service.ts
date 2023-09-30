import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { User } from '../user/user.schema';
import { Order } from '../order/order.schema';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { Product } from '../product/product.schema';
import { Category } from '../category/category.schema';
import { Campaign } from '../campaign/campaign.schema';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { CampaignModule } from '../campaign/campaign.module';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductModule>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserModule>,
        @InjectModel(Category.name)
        private readonly categoryModule: Model<CategoryModule>,
        @InjectModel(Campaign.name)
        private readonly campaignModule: Model<CampaignModule>,
        @InjectModel(Order.name)
        private readonly orderModule: Model<OrderModule>,
    ) {}

    /**
     * This function simplifies development by seeding default data if the database is empty.
     * It's not performance-critical since it runs only once in a real project or not at all.
     */
    async seed() {
        // Count the documents in each collection
        const countProduct = await this.productModel.countDocuments().exec();
        const countUser = await this.userModel.countDocuments().exec();
        const countCategory = await this.categoryModule.countDocuments().exec();
        const countCampaign = await this.campaignModule.countDocuments().exec();
        const countOrder = await this.orderModule.countDocuments().exec();

        const arr = [countProduct, countUser, countCategory, countCampaign, countOrder];

        const isEmptyDb = arr.every((q) => q === 0);
        if (isEmptyDb) {
            let variables = ['product', 'user', 'category', 'campaign', 'order'];
            const data = {};

            const ROOT_DIR = __dirname.replace(/dist.+/, '');
            for (let i = 0; i < variables.length; i++) {
                const variable = variables[i];
                const filePath = path.join(ROOT_DIR, 'src', 'seeder', `${variable}.seeder.json`);
                data[variable] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
            // Check if all collections are empty

            // Insert sample data into each collection if the database is empty
            await this.productModel.insertMany(data['product']);
            await this.userModel.insertMany(data['user']);
            await this.categoryModule.insertMany(data['category']);
            await this.campaignModule.insertMany(data['campaign']);
            await this.orderModule.insertMany(data['order']);
            console.log('Database seeded successfully.');
        } else {
            console.log('Database already contains data. Skipping seeding.');
        }
    }

    /**
     *  Call the seed method when the application starts
     * If dont want to seed db just add to comment on await this.seed()  func.
     */
    async onApplicationBootstrap() {
        await this.seed();
    }
}
