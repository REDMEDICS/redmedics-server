import { Injectable } from '@nestjs/common';
import { CreateTurnoCentroDto } from './dto/create-turno-centro.dto';
import { UpdateTurnoCentroDto } from './dto/update-turno-centro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TurnoCentro } from './schemas/turno-centro.schemas';
import { Model } from 'mongoose';
import { FilterTurnosDto } from './dto/filter-turnos.dto';

@Injectable()
export class TurnoCentroService {

  constructor(
    @InjectModel(TurnoCentro.name)
    private readonly turnoCentroModel: Model<TurnoCentro>,
  ) { }
  create(createTurnoCentroDto: CreateTurnoCentroDto) {
    return this.turnoCentroModel.create(createTurnoCentroDto);
  }

async findAll(filters?: FilterTurnosDto) {
  const query = this.turnoCentroModel.find();
  if (filters?.centro) {
    query.where('centro').equals(filters.centro);
  }
  if (filters?.especialidad) {
    query.where('especialidad').equals(filters.especialidad);
  }
  
  return query
    .populate('centro', 'nombre')
    .populate('especialidad', 'nombre abreviatura')
    .exec();
}

  findOne(id: number) {
    return `This action returns a #${id} turnoCentro`;
  }

  update(id: number, updateTurnoCentroDto: UpdateTurnoCentroDto) {
    return `This action updates a #${id} turnoCentro`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnoCentro`;
  }
}
