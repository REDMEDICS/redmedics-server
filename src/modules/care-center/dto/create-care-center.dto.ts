import { IsString } from 'class-validator';

export class CreateCareCenterDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}
