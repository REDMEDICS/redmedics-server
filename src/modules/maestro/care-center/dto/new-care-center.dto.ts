import { IsNumber, IsString } from 'class-validator';

export class NewCareCenterDto {

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    image: string;

    @IsString()
    ubigeo: string;
}