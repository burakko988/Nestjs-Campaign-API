import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MongoIdParam {
    @IsNotEmpty()
    @IsMongoId()
    id: string;
}
