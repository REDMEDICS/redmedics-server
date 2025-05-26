import { Injectable } from '@nestjs/common';
import { CreateUbigeoDto } from './dto/create-ubigeo.dto';
import { UpdateUbigeoDto } from './dto/update-ubigeo.dto';

@Injectable()
export class UbigeoService {
  create(createUbigeoDto: CreateUbigeoDto) {
    return 'This action adds a new ubigeo';
  }

  findAll() {
    return `This action returns all ubigeo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ubigeo`;
  }

  update(id: number, updateUbigeoDto: UpdateUbigeoDto) {
    return `This action updates a #${id} ubigeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubigeo`;
  }
}
