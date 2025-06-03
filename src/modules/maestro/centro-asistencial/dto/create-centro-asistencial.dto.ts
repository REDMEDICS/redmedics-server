import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

class RolCentroDto {
    @ApiProperty({ example: 'ADMINISTRADOR', description: 'Nombre del rol (en mayúsculas)' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        example: ['create_users', 'read_users'],
        description: 'Permisos del rol'
    })
    @IsArray()
    @ArrayNotEmpty()
    permisos: string[];

    @ApiProperty({ required: false, example: 'Rol para administradores del centro' })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({ required: false, default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}

export class CreateCentroAsistencialDto {
    @ApiProperty({ example: 'Clínica San Juan', required: true })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: '+51987654321', required: false })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({ example: 'Av. Lima 123', required: false })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({ example: -12.046374, required: false })
    @IsLatitude()
    @IsOptional()
    latitud?: number;

    @ApiProperty({ example: -77.042793, required: false })
    @IsLongitude()
    @IsOptional()
    longitud?: number;

    @ApiProperty({
        example: 'https://ejemplo.com/imagen.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    imagen?: string;

    @ApiProperty({ required: false, default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @ApiProperty({ example: '150101', required: false })
    @IsString()
    @IsOptional()
    ubigeo?: string;

    @ApiProperty({ type: [RolCentroDto], required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RolCentroDto)
    @IsOptional()
    roles?: RolCentroDto[];

    @ApiProperty({
        example: ['507f1f77bcf86cd799439011'],
        required: false,
        description: 'IDs de consultorios'
    })
    @IsArray()
    @IsOptional()
    consultorios?: string[];
}
