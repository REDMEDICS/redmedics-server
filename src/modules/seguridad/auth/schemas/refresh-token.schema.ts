import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class RefreshToken extends Document {
  @Prop({ required: true })
  token: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: true })
  isValid: boolean;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);