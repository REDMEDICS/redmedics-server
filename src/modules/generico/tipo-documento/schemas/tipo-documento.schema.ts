
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TipoDocumento extends Document {
  @Prop({ type: String, unique: true, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  nombreCorto: string;

  @Prop({ type: String, required: false })
  expresionRegular?: string;

  @Prop({ type: String, required: true })
  codigoPais: string;

  @Prop({ type: Boolean, required: false, default: true })
  estado?: boolean;
}

export const TipoDocumentoSchema = SchemaFactory.createForClass(TipoDocumento);
