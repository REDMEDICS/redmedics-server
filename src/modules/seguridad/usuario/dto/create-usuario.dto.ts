import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUppercase, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CentroUsuarioDto {
    @IsNotEmpty()
    centro: string;

    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    rol: string;
}

export class CreateUsuarioDto {
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsOptional()
    nombres?: string;

    @IsString()
    @IsOptional()
    apellidos?: string;

    @IsOptional()
    especialidades?: string;

    @IsArray()
    @IsOptional()
    @IsEnum(['GOOGLE'], { each: true })
    proveedores?: ('GOOGLE')[];

    @IsBoolean()
    @IsOptional()
    cuentaVerificada?: boolean;

    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @IsDateString()
    @IsOptional()
    fechaNacimiento?: Date;

    @IsOptional()
    tipoDocumento?: string;

    @IsString()
    @IsOptional()
    numeroDocumento?: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsString()
    @IsOptional()
    celular?: string;

    @IsString()
    @IsOptional()
    numeroColegiatura?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CentroUsuarioDto)
    centros?: CentroUsuarioDto[];
}