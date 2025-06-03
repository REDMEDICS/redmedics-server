import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CookieOptions, Response } from 'express';
import { DeleteResult, Model, ObjectId } from 'mongoose';
import { JwtPayload, ProviderUser } from 'src';
import { getPasswordHash, isPasswordValid } from 'src/common/utils/auth.utils';
import { SignUpDto } from './dto/sign-up.dto';
import { OAuth2Client } from 'google-auth-library';
import { RefreshToken } from './schemas/refresh-token.schema';
import { Usuario } from '../usuario/schemas/usuario.schema';

@Injectable()
export class AuthService {
  isProductionOrQA: boolean;
  constructor(
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
    private readonly configSvc: ConfigService,
  ) {
    const environment = configSvc.get<string>('NODE_ENV');
    this.isProductionOrQA =
      environment === 'production' || environment === 'qa';
  }

  private getCookieSettings(): {
    domain: string | undefined;
    isSecure: boolean;
    sameSite: 'none' | 'lax' | 'strict';
  } {
    const cookieDomain = this.configSvc.get<string>('app.domain');
    let domain: string | undefined;
    let sameSite: 'none' | 'lax' | 'strict' = 'lax';
    let isSecure = false;
    if (cookieDomain === 'localhost') {
      domain = undefined;
      isSecure = false;
      sameSite = 'lax';
    } else {
      domain = cookieDomain;
      isSecure = true;
      sameSite = 'none';
    }
    return {
      domain,
      isSecure,
      sameSite
    };
  }

  private getCookieOptions(): CookieOptions {
    const { domain, isSecure, sameSite } = this.getCookieSettings();

    return {
      httpOnly: true,
      secure: isSecure,
      sameSite: sameSite,
      domain: domain,
      path: '/',
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { password } = signUpDto;
    const { passwordHash } = await getPasswordHash(password, 6);
    const data: SignUpDto = {
      ...signUpDto,
      password: passwordHash,
    };
    const createdUser = new this.userModel(data);
    await createdUser.save()
    return null;
  }

  async validateUser(correo: string, password: string): Promise<JwtPayload> {
    const user = await this.userModel
      .findOne({ correo, cuentaVerificada: true }).exec();
    if (!user) throw new UnauthorizedException('Credenciales no válidas');
    const isMatch = await isPasswordValid(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales no válidas');

    return {
      id: user._id,
      correo: user.correo,
      fullName: `${user.nombres} ${user.apellidos}`,
      role: 'ADMINISTRADOR',
    };
  }

  async findUserById(id: string): Promise<JwtPayload> {
    const user = await this.userModel
      .findById(id)
      .populate('role', '-createdAt -updatedAt -status')
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado o cuenta no verificada');
    return {
      id: user._id as ObjectId,
      correo: user.correo,
      fullName: `${user.nombres} ${user.apellidos}`,
      role: 'ADMIN'
    };
  }

  async validateProviderUser(
    idToken: string,
    provider: string,
  ): Promise<JwtPayload> {
    let userProvier!: ProviderUser;
    if (provider == 'GOOGLE') {
      userProvier = await this.validateGoogle(idToken);
    }
    const { id, correo } = userProvier;
    const user = await this.userModel
      .findOne({ correo })
      .populate('role', '-createdAt -updatedAt -status')
      .exec();
    if (!user) {
      throw new UnauthorizedException("No se encontró el usuario");
    }
    await this.provider(user, id, provider);
    return {
      id: user._id as ObjectId,
      correo: user.correo,
      fullName: `Merling Josue Ramirez Yugra`,
      role: 'ADMIN',
    };
  }

  async validateGoogle(idToken: string): Promise<ProviderUser> {
    const client = new OAuth2Client(this.configSvc.get<string>('google.cliendId'));
    const ticket = await client.verifyIdToken({
      idToken,
      audience: this.configSvc.get<string>('google.cliendId'),
    });
    const payload = ticket.getPayload();
    return {
      id: payload!.sub,
      correo: payload!.email ?? '',
    };
  }

  async signIn(
    user: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateToken(user);
    return tokens;
  }

  async generateToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configSvc.get<string>('jwt.accessTokenSecret'),
      expiresIn: this.configSvc.get<string>('jwt.accessTokenExpiry'),
    });
    const refreshTokenPayload = {
      id: payload.id.toString()
    };

    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: this.configSvc.get<string>('jwt.refreshTokenSecret'),
      expiresIn: this.configSvc.get<string>('jwt.refreshTokenExpiry'),
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.createRefreshToken(
      payload.id.toString(),
      refreshToken,
      expiresAt,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(
    payload: JwtPayload,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    await this.revokeRToken(payload.id.toString(), refreshToken);
    return this.generateToken(payload);
  }

  setTokenCookie(res: Response, name: string, value: string) {
    const maxAgeInSeconds: number = name === 'RFTV'
      ? this.configSvc.get<number>('jwt.refreshTokenExpiryInSeconds') ?? 86400
      : this.configSvc.get<number>('jwt.accessTokenExpiryInSeconds') ?? 3600; 

    const options = this.getCookieOptions();
    options.maxAge = maxAgeInSeconds * 1000;
    res.cookie(name, value, options);
  }

  setUserCookie(res: Response, user: JwtPayload) {
    const options = this.getCookieOptions();
    options.httpOnly = false;

    res.cookie('SSUS', JSON.stringify(user), options);
  }

  async provider(user: any, id: string, provider: string) {
    const data = user.providers.some((value) => value.id === id);
    if (!data) {
      const data: any = { name: provider, id };
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $push: { providers: data } },
      );
    }
  }

  async createRefreshToken(userId: string, token: string, expiresAt: Date) {
    return this.refreshTokenModel.create({
      token,
      userId,
      expiresAt,
      isValid: true
    });
  }

async revokeRToken(userId: string, token: string): Promise<DeleteResult> {
  return this.refreshTokenModel.deleteOne({ token, userId });
}

  async validateRefreshToken(refreshToken: string, userId: string) {
    return await this.refreshTokenModel.findOne({
      token: refreshToken,
      userId,
      isValid: true,
      expiresAt: { $gt: new Date() }
    });
  }

  async logout(res: Response) {
    const options = this.getCookieOptions();
    res.clearCookie('SIDV', options);
    res.clearCookie('RFTV', options);
    res.clearCookie('SSUS', {
      ...options,
      httpOnly: false
    });
  }
}
