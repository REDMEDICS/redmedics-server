import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoDocumentoDto {
    @ApiProperty({
        description: 'Nombre completo del tipo de documento',
        example: 'Cédula de Ciudadanía',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Nombre corto o abreviado del documento',
        example: 'CC',
    })
    @IsString()
    @IsNotEmpty()
    nombreCorto: string;

    @ApiPropertyOptional({
        description: 'Expresión regular para validar el número del documento',
        example: '^[0-9]{6,10}$',
    })
    @IsString()
    @IsOptional()
    expresionRegular?: string;

    @ApiProperty({
        description: 'Código del país al que pertenece el tipo de documento',
        example: 'CO',
    })
    @IsString()
    @IsNotEmpty()
    codigoPais: string;

    @ApiPropertyOptional({
        description: 'Indica si el tipo de documento está activo',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}
