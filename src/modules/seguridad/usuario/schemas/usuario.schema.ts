import { TipoDocumento } from '@modules/generico/tipo-documento/schemas/tipo-documento.schema';
import { CentroAsistencial } from '@modules/maestro/centro-asistencial/schemas/centro-asistencial.schema';
import { Especialidad } from '@modules/maestro/especialidad/schemas/especialidad.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Usuario extends Document {

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  nombres: string;

  @Prop()
  apellidos: string;

  @Prop({ type: Types.ObjectId, ref: 'Especialidad' })
  especialidades?: Especialidad;

  @Prop({
    type: [String],
    default: [],
    enum: ['GOOGLE']
  })
  proveedores?: ('GOOGLE')[];

  @Prop({ default: false })
  cuentaVerificada?: boolean;

  @Prop({ default: true })
  estado?: boolean;


  @Prop()
  fechaNacimiento?: Date;

  @Prop({ type: Types.ObjectId, ref: 'TipoDocumento' })
  tipoDocumento?: TipoDocumento;

  @Prop()
  numeroDocumento?: string;

  @Prop()
  telefono?: string;

  @Prop()
  direccion?: string;

  @Prop()
  celular?: string;

  @Prop()
  numeroColegiatura?: string;

  @Prop({
    type: [{
      centro: {
        type: Types.ObjectId,
        ref: 'CentroAsistencial',
        required: true
      },
      rol: {
        type: String,
        required: true,
        uppercase: true
      }
    }],
    default: [],
    _id: false
  })
  centros?: Array<{
    centro: Types.ObjectId | CentroAsistencial;
    rol: string;
  }>;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);