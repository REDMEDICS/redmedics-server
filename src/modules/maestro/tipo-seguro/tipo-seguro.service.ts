import { Injectable } from '@nestjs/common';
import { CreateTipoSeguroDto } from './dto/create-tipo-seguro.dto';
import { UpdateTipoSeguroDto } from './dto/update-tipo-seguro.dto';

@Injectable()
export class TipoSeguroService {
  create(createTipoSeguroDto: CreateTipoSeguroDto) {
    return 'This action adds a new tipoSeguro';
  }

  findAll() {
    return `This action returns all tipoSeguro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoSeguro`;
  }

  update(id: number, updateTipoSeguroDto: UpdateTipoSeguroDto) {
    return `This action updates a #${id} tipoSeguro`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoSeguro`;
  }
}
