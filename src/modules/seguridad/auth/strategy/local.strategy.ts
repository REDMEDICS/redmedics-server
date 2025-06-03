import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authSvc: AuthService
    ) {
        super({usernameField: 'correo',})
    }

    async validate(correo: string, password: string): Promise<any> {
        const user = await this.authSvc.validateUser(correo, password);
        if (!user) {
            throw new UnauthorizedException("Credenciales incorrectas. Verifica tu correo y contraseña");
        }
        return user;
    }
}