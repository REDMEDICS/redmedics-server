import { Module } from '@nestjs/common';
import { TurnoCentroService } from './turno-centro.service';
import { TurnoCentroController } from './turno-centro.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TurnoCentro, TurnoCentroSchema } from './schemas/turno-centro.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TurnoCentro.name, schema: TurnoCentroSchema },
    ]),
  ],
  controllers: [TurnoCentroController],
  providers: [TurnoCentroService],
})
export class TurnoCentroModule { }
