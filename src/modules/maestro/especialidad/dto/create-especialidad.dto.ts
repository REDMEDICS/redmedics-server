import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEspecialidadDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    abreviatura: string;

    @IsString()
    codigo: string;
}
