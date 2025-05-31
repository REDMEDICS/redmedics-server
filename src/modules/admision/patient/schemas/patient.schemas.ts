import { DocumentType } from '@modules/generico/document-type/schemas/document-type.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Patient {
    @Prop({ required: true })
    celular: string;

    @Prop({ type: Types.ObjectId, ref: 'DocumentType', required: true })
    tipoDocumento: DocumentType;

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
    tipoSeguro: DocumentType;

    @Prop()
    fechaNacimiento: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);