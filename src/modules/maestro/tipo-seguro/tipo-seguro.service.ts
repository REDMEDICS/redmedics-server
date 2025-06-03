import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoSeguroDto } from './dto/create-tipo-seguro.dto';
import { UpdateTipoSeguroDto } from './dto/update-tipo-seguro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoSeguro } from './schemas/tipo-seguro.schemas';
import { Model } from 'mongoose';

@Injectable()
export class TipoSeguroService {

  constructor(
    @InjectModel(TipoSeguro.name) private readonly tipoSeguroModel: Model<TipoSeguro>,
  ) { }
  async create(createTipoSeguroDto: CreateTipoSeguroDto) {
    return await this.tipoSeguroModel.create(createTipoSeguroDto);
  }

  findAll() {
    return this.tipoSeguroModel.find().select('-createdAt -updatedAt').exec();
  }

  async findOne(id: string) {
    const tipoSeguro = await this.tipoSeguroModel.findById(id);
    if (!tipoSeguro) {
      throw new NotFoundException(`TipoSeguro con ID ${id} no encontrado`);
    }
    return tipoSeguro;
  }

  async update(id: string, updateTipoSeguroDto: UpdateTipoSeguroDto) {
    const tipoSeguro = await this.tipoSeguroModel.findByIdAndUpdate(id, updateTipoSeguroDto, { new: true });
    if (!tipoSeguro) {
      throw new NotFoundException(`TipoSeguro con ID ${id} no encontrado`);
    }
    return tipoSeguro;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoSeguro`;
  }
}
