import { IsDefined, IsNotEmpty, IsEnum, IsOptional, Validate, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { IBasketItems } from '../order.schema';

export class CreateOrderDto {
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, { message: 'Must have min 1 item' })
    basketItems: IBasketItems[];
}
