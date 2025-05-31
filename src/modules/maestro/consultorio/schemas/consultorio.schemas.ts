import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Consultorio {
    @Prop({ required: true })
    nombre: string;

    @Prop({ default: true })
    estado: boolean;
}

export const ConsultorioSchema = SchemaFactory.createForClass(Consultorio);