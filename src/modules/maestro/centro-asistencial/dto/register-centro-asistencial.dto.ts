import { IsString } from 'class-validator';

export class RegisterCentroAsistencialDto {
    @IsString()
    nombre: string;

    @IsString()
    telefono: string;

    @IsString()
    direccion: string;
}