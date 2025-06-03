import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoCentroDto } from './create-turno-centro.dto';

export class UpdateTurnoCentroDto extends PartialType(CreateTurnoCentroDto) {}
