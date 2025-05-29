import { PartialType } from '@nestjs/mapped-types';
import { NewCareCenterDto } from './new-care-center.dto';

export class UpdateCareCenterDto extends PartialType(NewCareCenterDto) {}
