import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Especialidad {
    @Prop({ required: true })
    nombre: string;
    
    @Prop({ required: true })
    abreviatura: string;

    @Prop({ required: true, uppercase: true })
    codigo: string;

    @Prop({ default: true })
    estado: boolean;
    
}

export const EspecialidadSchema = SchemaFactory.createForClass(Especialidad);