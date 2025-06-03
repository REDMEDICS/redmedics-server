import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Especialidad, EspecialidadSchema } from './schemas/especialidad.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Especialidad.name, schema: EspecialidadSchema }
    ]),
  ],
  controllers: [EspecialidadController],
  providers: [EspecialidadService],
})
export class EspecialidadModule { }
