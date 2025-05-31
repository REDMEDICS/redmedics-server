import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class TipoSeguro {

    @Prop()
    nombre: string;

    @Prop()
    codigo: string;
}

export const TipoSeguroSchema = SchemaFactory.createForClass(TipoSeguro);