import { Especialidad } from '@modules/maestro/especialidad/schemas/especialidad.schemas';
import { User } from '@modules/seguridad/user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Cita {
    @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
    paciente: string;

    @Prop({ required: true })
    celular: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: Types.ObjectId, ref: 'Especialidad' })
    especialidad: Especialidad;

    @Prop({ required: true, enum: ['TELECONSULTA', 'PRESENCIAL'] })
    tipoCita: string;

    @Prop({ required: true })
    fechaCita: Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    profesional: User;

    @Prop({ required: true })
    turno: Date;
}

export const CitaSchema = SchemaFactory.createForClass(Cita);