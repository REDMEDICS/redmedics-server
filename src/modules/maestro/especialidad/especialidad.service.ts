import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Especialidad } from './schemas/especialidad.schemas';
import { Model } from 'mongoose';

@Injectable()
export class EspecialidadService {

  constructor(
    @InjectModel(Especialidad.name)
    private readonly especialidadModel: Model<Especialidad>,
  ) { }

  async create(createEspecialidadDto: CreateEspecialidadDto): Promise<Especialidad> {
    const createdEspecialidad = new this.especialidadModel(createEspecialidadDto);
    return await createdEspecialidad.save();
  }

  async findAll(): Promise<Especialidad[]> {
    return await this.especialidadModel.find().exec();
  }

  async findOne(id: string): Promise<Especialidad> {
    const especialidad = await this.especialidadModel.findOne({
      _id: id,
      estado: true
    }).exec();

    if (!especialidad) {
      throw new NotFoundException(`Especialidad con ID ${id} no encontrada`);
    }
    return especialidad;
  }

  async update(id: string, updateEspecialidadDto: UpdateEspecialidadDto): Promise<Especialidad> {
    const existingEspecialidad = await this.especialidadModel
      .findOneAndUpdate(
        { _id: id, estado: true },
        { $set: updateEspecialidadDto },
        { new: true }
      )
      .exec();

    if (!existingEspecialidad) {
      throw new NotFoundException(`Especialidad con ID ${id} no encontrada`);
    }
    return existingEspecialidad;
  }

  async remove(id: string): Promise<Especialidad> {
    const deletedEspecialidad = await this.especialidadModel
      .findOneAndUpdate(
        { _id: id, estado: true },
        { $set: { estado: false } },
        { new: true }
      )
      .exec();

    if (!deletedEspecialidad) {
      throw new NotFoundException(`Especialidad con ID ${id} no encontrada o ya está inactiva`);
    }
    return deletedEspecialidad;
  }
  
  
}
