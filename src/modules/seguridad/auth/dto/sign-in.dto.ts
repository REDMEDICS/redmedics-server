import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsNotEmpty({ message: 'El campo email es obligatorio.' })
    @IsEmail({}, { message: 'El campo email debe ser un correo electrónico válido.' })
    correo: string;

    @IsNotEmpty({ message: 'El campo password es obligatorio.' })
    @IsString({ message: 'El campo password debe ser un string.' })
    password: string;
}
