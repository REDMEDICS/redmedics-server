import { Injectable } from '@nestjs/common';
import { CreateProgramacionPersonalDto } from './dto/create-programacion-personal.dto';
import { UpdateProgramacionPersonalDto } from './dto/update-programacion-personal.dto';

@Injectable()
export class ProgramacionPersonalService {
  create(createProgramacionPersonalDto: CreateProgramacionPersonalDto) {
    return 'This action adds a new programacionPersonal';
  }

  findAll() {
    return `This action returns all programacionPersonal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programacionPersonal`;
  }

  update(id: number, updateProgramacionPersonalDto: UpdateProgramacionPersonalDto) {
    return `This action updates a #${id} programacionPersonal`;
  }

  remove(id: number) {
    return `This action removes a #${id} programacionPersonal`;
  }
}
