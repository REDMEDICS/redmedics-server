import { Area } from '@modules/maestro/area/schemas/area.schemas';
import { Consultorio } from '@modules/maestro/consultorio/schemas/consultorio.schemas';
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

    @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
    area: Area;

    @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
    consultio: Consultorio;

    @Prop()
    horaInicio: Date;

    @Prop()
    horaFinal: Date;

    @Prop({
        type: [Date],
        default: []
    })
    fechasProgramadas: Date[];

}

export const ProgramacionPersonalSchema = SchemaFactory.createForClass(ProgramacionPersonal);