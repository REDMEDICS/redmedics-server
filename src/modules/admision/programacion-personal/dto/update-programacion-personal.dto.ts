import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramacionPersonalDto } from './create-programacion-personal.dto';

export class UpdateProgramacionPersonalDto extends PartialType(CreateProgramacionPersonalDto) {}
