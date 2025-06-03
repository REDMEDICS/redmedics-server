import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoSeguroDto {
    @ApiProperty({
        description: 'Nombre del tipo de seguro',
        example: 'Seguro de Vida',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Código único del tipo de seguro',
        example: 'VIDA123',
    })
    @IsString()
    @IsNotEmpty()
    codigo: string;
}
