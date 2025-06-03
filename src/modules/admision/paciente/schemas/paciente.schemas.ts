import { TipoDocumento } from '@modules/generico/tipo-documento/schemas/tipo-documento.schema';
import { TipoSeguro } from '@modules/maestro/tipo-seguro/schemas/tipo-seguro.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Paciente {
    @Prop({ required: true })
    celular: string;

    @Prop({ type: Types.ObjectId, ref: 'TipoDocumento', required: true })
    tipoDocumento: TipoDocumento;

    @Prop({ required: true })
    numeroDocumento: string;

    @Prop({ required: true })
    nombres: string;

    @Prop({ required: true })
    apellidoPaterno: string;

    @Prop({ required: true })
    apellidoMaterno: string;

    @Prop({ required: true })
    sexo: string;

    @Prop({ required: true })
    email: string;
    
    @Prop()
    direccion: string;

    @Prop({ type: Types.ObjectId, ref: 'TipoSeguro' })
    tipoSeguro: TipoSeguro;

    @Prop()
    fechaNacimiento: Date;

    @Prop({ default: true })
    estado: boolean;
}

export const PacienteSchema = SchemaFactory.createForClass(Paciente);