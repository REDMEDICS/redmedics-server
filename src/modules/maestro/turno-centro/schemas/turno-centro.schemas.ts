import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DiasSemana } from '../enums/dias-semana.enum';

@Schema({ timestamps: true })
export class TurnoCentro extends Document {
    @Prop({ type: Types.ObjectId, ref: 'CentroAsistencial', required: true })
    centro: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Especialidad', required: true })
    especialidad: Types.ObjectId;

    @Prop({
        type: String,
        enum: Object.values(DiasSemana),
        required: true
    })
    dia: DiasSemana;
    
    @Prop({ type: String, required: true, match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ })
    inicio: string;

    @Prop({ type: String, required: true, match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ })
    fin: string;
}

export const TurnoCentroSchema = SchemaFactory.createForClass(TurnoCentro);