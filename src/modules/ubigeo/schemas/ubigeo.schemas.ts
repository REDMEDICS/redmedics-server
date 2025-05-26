import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Country } from 'src/modules/country/schemas/country.schemas';


@Schema()
export class Ubigeo {
  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  department: string;

  @Prop({ type: String, required: true })
  province: string;

  @Prop({ type: String, required: true })
  district: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  })
  country: Country;

  @Prop({ type: Boolean, required: false, default: true })
  status?: boolean;
}

export const UbigeoSchema = SchemaFactory.createForClass(Ubigeo);
