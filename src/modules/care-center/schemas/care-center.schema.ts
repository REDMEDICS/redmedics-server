import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Ubigeo } from 'src/modules/ubigeo/schemas/ubigeo.schemas';
import { User } from 'src/modules/user/schemas/user.schema';

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

    @Prop({
        type: Types.ObjectId,
        ref: 'Ubigeo',
        // required: true,
    })
    location: Ubigeo;

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