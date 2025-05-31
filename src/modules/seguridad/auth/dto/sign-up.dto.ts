import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {

    @IsNotEmpty({ message: 'El campo email es obligatorio.' })
    @IsEmail({}, { message: 'El campo email debe ser un correo electrónico válido.' })
    email: string;
    
    @IsNotEmpty({ message: 'El campo password es obligatorio.' })
    @IsString({ message: 'El campo password debe ser un string.' })
    password: string;

    @IsNotEmpty({ message: 'El campo nombres es obligatorio.' })
    @IsString({ message: 'El campo nombres debe ser un string.' })
    names: string;

    @IsNotEmpty({ message: 'El campo apellidos es obligatorio.' })
    @IsString({ message: 'El campo apellidos debe ser un string.' })
    surnames: string;
}
