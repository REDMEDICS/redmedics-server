import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroAsistencialDto } from './create-centro-asistencial.dto';

export class UpdateCentroAsistencialDto extends PartialType(CreateCentroAsistencialDto) {}
