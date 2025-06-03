import { Consultorio } from '@modules/maestro/consultorio/schemas/consultorio.schemas';
import { Usuario } from '@modules/seguridad/usuario/schemas/usuario.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class CentroAsistencial extends Document {
    @Prop({ required: true })
    nombre: string;

    @Prop()
    telefono: string;

    @Prop()
    direccion: string;

    @Prop()
    latitud?: number;

    @Prop()
    longitud?: number;

    @Prop()
    imagen?: string;

    @Prop({ default: true })
    estado?: boolean;

    @Prop()
    ubigeo?: string;

    @Prop({
        type: [{
            nombre: { type: String, required: true, unique: true, uppercase: true },
            permisos: { type: [String], required: true },
            descripcion: { type: String },
            estado: { type: Boolean, default: true }
        }],
        default: []
    })
    roles?: Array<{
        nombre: string;
        permisos: string[];
        descripcion?: string;
        estado?: boolean;
    }>;

    @Prop({ type: [Types.ObjectId], ref: 'Consultorio' })
    consultorios?: Consultorio[];

    @Prop({
        type: Types.ObjectId,
        ref: 'Usuario'
    })
    creadoPor?: Usuario;

    @Prop({
        type: Types.ObjectId,
        ref: 'Usuario',
    })
    actualizadoPor?: Usuario;
}

export const CentroAsistencialSchema = SchemaFactory.createForClass(CentroAsistencial);