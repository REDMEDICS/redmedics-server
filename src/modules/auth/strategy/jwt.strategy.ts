import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from 'src';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.['SIDV'];
          if (!token) {
            throw new UnauthorizedException('Sesión no válida. Por favor, ingresa nuevamente.');
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      passReqToCallback: true 
    });
  }
  async validate(request: Request, payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>
  ) {
    super({
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.['RFTV'];
          if (!token) {
            throw new UnauthorizedException('Token de actualización no encontrado');
          }
          return token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: { id: string }) {
    const refreshToken = req.cookies['RFTV'];
    await this.refreshTokenModel.findOne({
      token: refreshToken,
      userId: payload.id,
      isValid: true,
      expiresAt: { $gt: new Date() }
    });
    return { 
      ...payload, 
      refreshToken 
    };
  }
}