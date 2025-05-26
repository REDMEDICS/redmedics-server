import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithJwtPayload } from 'src';
import { ResponseMessage } from 'src/common/decorator/response-message.decorator';
import { RefreshAuthGuard } from '../../common/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../../common/guard/local-auth.guard';
// import { AuthGateway } from './auth.gateway';
import { AuthService } from './auth.service';
import { SignInProviderDto } from './dto/sign-in-provider';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    // private authGateway: AuthGateway
  ) { }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authSvc.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Req() req: RequestWithJwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const { accessToken, refreshToken } = await this.authSvc.signIn(user);
    this.authSvc.setTokenCookie(res, 'SIDV', accessToken);
    this.authSvc.setTokenCookie(res, 'RFTV', refreshToken);
    this.authSvc.setUserCookie(res, user);
    return req.user;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  @ResponseMessage('Refresh token generado exitosamente ')
  async refreshToken(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const payload = await this.authSvc.findUserById(req.user.id);
    const hashRefreshToken = await this.authSvc.validateRefreshToken(req.user.refreshToken, req.user.id);
    if (hashRefreshToken) {
      const { accessToken, refreshToken } = await this.authSvc.refreshToken(
        payload,
        req.user.refreshToken,
      );
      this.authSvc.setTokenCookie(res, 'SIDV', accessToken);
      this.authSvc.setTokenCookie(res, 'RFTV', refreshToken);
      this.authSvc.setUserCookie(res, payload);
      return payload;
    } else {
      this.authSvc.logout(res);
      return null;
    }
  }

  @Post('sign-in-provider')
  async signInProvider(
    @Body() body: SignInProviderDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (body.provider !== 'GOOGLE')
      throw new BadRequestException('Invalid provider');
    const user = await this.authSvc.validateProviderUser(
      body.idToken,
      body.provider,
    );
    const { accessToken, refreshToken } = await this.authSvc.signIn(user);
    this.authSvc.setTokenCookie(res, 'SIDV', accessToken);
    this.authSvc.setTokenCookie(res, 'RFTV', refreshToken);
    this.authSvc.setUserCookie(res, user);
    // this.authGateway.notifyAuthChange(user.id.toString(), user);
    return user;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('logout')
  async logout(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.user.id) {
      await this.authSvc.revokeRToken(req.user.id, req.user.refreshToken);
    }
     await this.authSvc.logout(res);
    return null;
  }
}
