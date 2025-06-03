import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true }) 
@Schema()
export class Permission {
  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  code: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: Boolean, required: false, default: true })
  status?: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
