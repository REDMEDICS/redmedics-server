import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authSvc: AuthService
    ) {
        super({usernameField: 'email',})
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authSvc.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException("Credenciales incorrectas. Verifica tu email y contraseña");
        }
        return user;
    }
}