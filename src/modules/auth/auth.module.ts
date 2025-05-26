import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// import { User, UserSchema } from 'src/modules/user/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
// import { AuthGateway } from './auth.gateway';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessTokenSecret'),
        // signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema } 
    ]),
    PassportModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    // AuthGateway,
  ],
})
export class AuthModule {}
