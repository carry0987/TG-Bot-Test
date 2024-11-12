import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;
}
