import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { CareCenter } from 'src/modules/care-center/schemas/care-center.schema';
import { DocumentType } from 'src/modules/document-type/schemas/document-type.schema';

@Schema({ _id: false })
export class Provider {
  @Prop()
  name: string;

  @Prop()
  id: string;
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);

@Schema({ timestamps: true })
export class User extends Document {

  @Prop({ type: Types.ObjectId, index: true })
  role?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ type: [ProviderSchema], default: [] })
  providers: Provider[];

  @Prop({ default: false })
  verifiedAccount: boolean;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  names: string;

  @Prop()
  surnames: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ type: Types.ObjectId, ref: 'DocumentType' })
  documentType: DocumentType;

  @Prop()
  documentNumber: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  cellPhone: string;

  @Prop()
  numColegiatura: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CareCenter' }] })
  centers: Types.ObjectId[] | CareCenter[];
}

export const UserSchema = SchemaFactory.createForClass(User);