import { Request } from 'express';
import { User } from './user/schemas/user.schema';
import { ObjectId } from 'mongoose';

export type JwtPayload = {
  id: any;
  correo: User['email'];
  role: User['role'];
  fullName: string;
};

export type ExpressRequestWithJWT = Request & { user: JwtPayload };
export type RequestWithJwtPayload = ExpressRequestWithJWT;

export interface ProviderUser {
  id: string;
  correo: string;
}
