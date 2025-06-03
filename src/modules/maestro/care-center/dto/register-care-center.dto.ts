import { IsString } from 'class-validator';

export class RegisterCareCenterDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}