import { Module } from '@nestjs/common';
import { ConsultorioService } from './consultorio.service';
import { ConsultorioController } from './consultorio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultorio, ConsultorioSchema } from './schemas/consultorio.schemas';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Consultorio.name, schema: ConsultorioSchema }
      ]),
    ],
  controllers: [ConsultorioController],
  providers: [ConsultorioService],
})
export class ConsultorioModule {}
