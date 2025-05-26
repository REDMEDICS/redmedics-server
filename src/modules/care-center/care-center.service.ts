import { Injectable } from '@nestjs/common';
import { CreateCareCenterDto } from './dto/create-care-center.dto';
import { UpdateCareCenterDto } from './dto/update-care-center.dto';

@Injectable()
export class CareCenterService {
  create(createCareCenterDto: CreateCareCenterDto) {
    return 'This action adds a new careCenter';
  }

  findAll() {
    return `This action returns all careCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careCenter`;
  }

  update(id: number, updateCareCenterDto: UpdateCareCenterDto) {
    return `This action updates a #${id} careCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} careCenter`;
  }
}
