import { Consultorio } from '@modules/maestro/consultorio/schemas/consultorio.schemas';
// import { User } from '@modules/seguridad/user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class CareCenter extends Document {
    @Prop({ required: true })
    nombre: string;

    @Prop()
    telefono: string;

    @Prop()
    latitud: number;

    @Prop()
    longitud: number;

    @Prop()
    direccion: string;

    @Prop()
    imagen: string;

    @Prop({ default: true })
    estado: boolean;

    @Prop()
    ubigeo: string;
    @Prop({
        type: [{
            nombre: { type: String, required: true, unique: true, uppercase: true },
            permisos: { type: [String], required: true },
            descripcion: { type: String },
            estado: { type: Boolean, default: true }
        }],
        default: []
    })
    roles: Array<{
        nombre: string;
        permisos: string[];
        descripcion?: string;
        estado?: boolean;
    }>;

    @Prop({
        type: [{
            especialidad: {
                type: Types.ObjectId,
                ref: 'Especialidad',
                required: true
            },
            turnos: [{
                dia: {
                    type: String,
                    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    required: true
                },
                horas: [{
                    inicio: { type: Date, required: true },
                    fin: { type: Date, required: true }
                }]
            }]
        }],
        default: []
    })
    especialidadesConTurnos: Array<{
        especialidad: Types.ObjectId;
        turnos: Array<{
            dia: string;
            horas: Array<{
                inicio: Date;
                fin: Date;
            }>;
        }>;
    }>;


    @Prop({ type: [Types.ObjectId], ref: 'Consultorio' })
    consultorios: Consultorio[];

    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    createdBy: any;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    updatedBy?: any;
}

export const CareCenterSchema = SchemaFactory.createForClass(CareCenter);