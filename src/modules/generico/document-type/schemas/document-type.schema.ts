import { Country } from '@modules/generico/country/schemas/country.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class DocumentType extends Document {
  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: String, required: true })
  shortName: string;

  @Prop({ type: String, required: false })
  regex?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  })
  country: Country;

  @Prop({ type: Boolean, required: false, default: true })
  status?: boolean;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
