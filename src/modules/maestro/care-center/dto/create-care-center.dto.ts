import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

class TurnoHorasDto {
    @IsNotEmpty()
    inicio: Date;

    @IsNotEmpty()
    fin: Date;
}

class TurnoDto {
    @IsNotEmpty()
    @IsString()
    dia: string;

    @IsArray()
    @IsNotEmpty()
    horas: TurnoHorasDto[];
}

class EspecialidadTurnoDto {
    @IsNotEmpty()
    especialidad: Types.ObjectId;

    @IsArray()
    @IsNotEmpty()
    turnos: TurnoDto[];
}

class RolDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsNotEmpty()
    permissions: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}

export class CreateCareCenterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsOptional()
    latitude?: number;

    @IsOptional()
    longitude?: number;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsString()
    @IsOptional()
    ubigeo?: string;

    @IsArray()
    @IsOptional()
    roles?: RolDto[];

    @IsArray()
    @IsOptional()
    especialidadesConTurnos?: EspecialidadTurnoDto[];

    @IsArray()
    @IsOptional()
    consultorios?: Types.ObjectId[];
}
