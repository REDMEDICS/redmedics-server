import { Especialidad } from '@modules/maestro/especialidad/schemas/especialidad.schemas';
import { User } from '@modules/seguridad/user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProgramacionPersonal {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    profesional: User;

    @Prop({ type: Types.ObjectId, ref: 'Especialidad', required: true })
    especialidad: Especialidad;


    @Prop({ required: true })
    abreviatura: string;

    @Prop({ required: true, uppercase: true })
    codigo: string;

    @Prop({ default: true })
    estado: boolean;
}

export const ProgramacionPersonalSchema = SchemaFactory.createForClass(ProgramacionPersonal);