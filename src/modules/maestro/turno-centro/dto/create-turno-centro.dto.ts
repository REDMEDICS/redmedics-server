import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { DiasSemana } from '../enums/dias-semana.enum';

export class CreateTurnoCentroDto {
    @IsNotEmpty()
    @IsString()
    centro: string;

    @IsNotEmpty()
    @IsString()
    especialidad: string;

    @IsNotEmpty()
    @IsEnum(DiasSemana)
    dia: DiasSemana;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Formato de hora inválido. Use HH:MM'
    })
    inicio: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Formato de hora inválido. Use HH:MM'
    })
    fin: string;
}
