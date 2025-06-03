import { Especialidad } from '@modules/maestro/especialidad/schemas/especialidad.schemas';
import { Usuario } from '@modules/seguridad/usuario/schemas/usuario.schema';
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
        ref: 'Usuario',
    })
    profesional: Usuario;

    @Prop({ required: true })
    turno: Date;
}

export const CitaSchema = SchemaFactory.createForClass(Cita);