import { Request } from 'express';
import { User } from './user/schemas/user.schema';
import { ObjectId } from 'mongoose';

export type JwtPayload = {
  id: ObjectId;
  email: User['email'];
  role: User['role'];
  fullName: string;
};

export type ExpressRequestWithJWT = Request & { user: JwtPayload };
export type RequestWithJwtPayload = ExpressRequestWithJWT;

export interface ProviderUser {
  id: string;
  email: string;
}
