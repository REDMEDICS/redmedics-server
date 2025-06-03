import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Paciente, PacienteSchema } from './schemas/paciente.schemas';
import { TipoDocumento, TipoDocumentoSchema } from '@modules/generico/tipo-documento/schemas/tipo-documento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Paciente.name, schema: PacienteSchema },
      { name: TipoDocumento.name, schema: TipoDocumentoSchema },
    ]),
  ],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule { }
