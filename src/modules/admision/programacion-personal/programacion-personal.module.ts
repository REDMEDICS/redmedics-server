import { Module } from '@nestjs/common';
import { ProgramacionPersonalService } from './programacion-personal.service';
import { ProgramacionPersonalController } from './programacion-personal.controller';

@Module({
  controllers: [ProgramacionPersonalController],
  providers: [ProgramacionPersonalService],
})
export class ProgramacionPersonalModule {}
