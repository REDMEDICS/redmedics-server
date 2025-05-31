import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// Subclase para teléfonos
class PhoneDto {
  @IsString()
  @IsEnum(['home', 'mobile'])
  type: string;

  @IsString()
  number: string;
}

// Subclase para la información personal
class PersonDto {
  @IsNotEmpty()
  @IsMongoId()
  documentType: string;

  @IsString()
  documentNumber: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones: PhoneDto[];

  @IsBoolean()
  termsAccepted: boolean;

  @IsBoolean()
  dataAuthorization: boolean;
}

// Subclase para la dirección
class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}

export class RefreshTokenDto {
  @IsString({ message: 'token must be a string' })
  token: string;

  @IsDate({ message: 'expiresAt must be a valid date' })
  expiresAt: Date;

  @IsDate({ message: 'createdAt must be a valid date' })
  createdAt: Date;
}

export class ProviderDto {
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsString({ message: 'id must be a string' })
  id: string;
}

// DTO principal
export class CreateUserDto {
  @IsNotEmpty()
  @IsMongoId()
  role: string;

  @IsString()
  userType: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @ValidateNested({ each: true })
  @Type(() => ProviderDto)
  providers?: ProviderDto[];

  @IsBoolean()
  @IsOptional()
  verifiedAccount?: boolean;

  @IsString()
  @IsOptional()
  tokenVerify?: string;

  @IsDate()
  @IsOptional()
  tokenExpiry?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonDto)
  person: PersonDto;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => RefreshTokenDto)
  refreshTokens?: RefreshTokenDto[];
}
