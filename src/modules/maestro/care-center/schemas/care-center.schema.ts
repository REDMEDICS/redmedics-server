import { Consultorio } from '@modules/maestro/consultorio/schemas/consultorio.schemas';
import { Especialidad } from '@modules/maestro/especialidad/schemas/especialidad.schemas';
import { User } from '@modules/seguridad/user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Role extends Document {
    @Prop({ type: String, unique: true, trim: true, required: true })
    name: string;

    @Prop({
        type: [String],
        required: true,
        default: []
    })
    permissions: string[];

    @Prop({ type: String, required: false })
    description?: string;

    @Prop({ type: Boolean, default: true })
    status?: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

@Schema({ timestamps: true, versionKey: false })
export class CareCenter extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    phone: string;

    @Prop()
    latitude: number;

    @Prop()
    longitude: number;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop({ default: false })
    status: boolean;

    @Prop()
    ubigeo: string;

    @Prop({
        type: [{
            name: { type: String, required: true },
            permissions: { type: [String], required: true },
            description: { type: String },
            status: { type: Boolean, default: true }
        }],
        default: []
    })
    roles: Array<{
        name: string;
        permissions: string[];
        description?: string;
        status?: boolean;
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
    createdBy: User;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
    })
    updatedBy?: User;
}

export const CareCenterSchema = SchemaFactory.createForClass(CareCenter);