import { IsOptional, IsString } from 'class-validator';

export class FilterTurnosDto {
  @IsOptional()
  @IsString()
  centro?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;
}