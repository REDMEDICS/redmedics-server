import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({
    description: 'Name of the document type',
    example: 'Documento Nacional de Identidad',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Short name or abbreviation of the document type',
    example: 'DNI',
  })
  @IsNotEmpty()
  @IsString()
  shortName: string;

  @ApiProperty({
    description: 'Regular expression for validating the document format',
    example: '^d{8}$',
    required: false,
  })
  @IsOptional()
  @IsString()
  regex?: string;

  @ApiProperty({
    description: 'MongoDB ObjectId of the associated country',
    example: '6759a9dd34bcdb9af24ab02c',
  })
  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
