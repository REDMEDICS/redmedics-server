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

    @Prop({ type: [Types.ObjectId], ref: 'Especialidad' })
    especialidades: Especialidad[];

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