import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class CreatePacienteDto {
    @ApiProperty({ example: '987654321' })
    @IsNotEmpty()
    @IsString()
    celular: string;

    @ApiProperty({ example: 'DNI', description: '683e5067beea8a2400e3c8f1' })
    @IsNotEmpty()
    @IsString()
    tipoDocumento: string;

    @ApiProperty({ example: '12345678' })
    @IsNotEmpty()
    @IsString()
    numeroDocumento: string;

    @ApiProperty({ example: 'Juan' })
    @IsNotEmpty()
    @IsString()
    nombres: string;

    @ApiProperty({ example: 'Pérez' })
    @IsNotEmpty()
    @IsString()
    apellidoPaterno: string;

    @ApiProperty({ example: 'Gómez' })
    @IsNotEmpty()
    @IsString()
    apellidoMaterno: string;

    @ApiProperty({ example: 'M', description: 'M: Masculino, F: Femenino' })
    @IsNotEmpty()
    @IsString()
    sexo: string;

    @ApiProperty({ example: 'juan.perez@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
    @IsOptional()
    @IsString()
    direccion?: string;

    @ApiPropertyOptional({ example: '643d38f7ae749038b87e7f1e', description: 'ID de tipo de seguro (referencia a TipoSeguro)' })
    @IsOptional()
    @IsString()
    tipoSeguro?: string;

    @ApiPropertyOptional({ example: '1990-05-20', description: 'Fecha de nacimiento en formato ISO' })
    @IsOptional()
    @IsDateString()
    fechaNacimiento?: Date;
}
