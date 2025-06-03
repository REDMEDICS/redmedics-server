import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Country {
  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: String, required: true })
  isoAlpha2Code: string;

  @Prop({ type: String, required: true })
  isoAlpha3Code: string;

  @Prop({ type: String, required: true })
  phoneCode: string;

  @Prop({ type: String, required: true })
  timeZone: string;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: Boolean, required: false, default: true })
  status?: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
