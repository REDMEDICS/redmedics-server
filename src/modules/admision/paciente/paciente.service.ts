import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Paciente } from './schemas/paciente.schemas';
import { Model } from 'mongoose';

@Injectable()
export class PacienteService {
  constructor(
    @InjectModel(Paciente.name)
    private readonly patientModel: Model<Paciente>,
  ) { }

  async create(createPacienteDto: CreatePacienteDto) {
    return this.patientModel.create(createPacienteDto);
  }

  async findAll() {
    return await this.patientModel.find()
      .populate('tipoDocumento')
      .populate('tipoSeguro')
      .exec();
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findById(id)
      .populate('tipoDocumento')
      .populate('tipoSeguro')
      .exec();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const existingPatient = await this.patientModel.findByIdAndUpdate(
      id,
      updatePacienteDto,
      { new: true }
    )
      .populate('tipoDocumento')
      .populate('tipoSeguro')
      .exec();

    if (!existingPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return existingPatient;
  }

  async remove(id: number) {
    const patient = await this.patientModel.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    ).exec();
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return patient;
  }
}
