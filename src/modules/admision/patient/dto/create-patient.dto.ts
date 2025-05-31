import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreatePatientDto {
    @IsNotEmpty()
    @IsString()
    celular: string;

    @IsNotEmpty()
    @IsString()
    tipoDocumento: string;

    @IsNotEmpty()
    @IsString()
    numeroDocumento: string;

    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsString()
    apellidoPaterno: string;

    @IsNotEmpty()
    @IsString()
    apellidoMaterno: string;

    @IsNotEmpty()
    @IsString()
    sexo: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    tipoSeguro?: string;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?: Date;
}