import { IsString } from 'class-validator';

export class SignInProviderDto {
  @IsString()
  idToken: string;

  @IsString()
  provider: string;
}