import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schemas/patient.schemas';
import { Model } from 'mongoose';

@Injectable()
export class PatientService {

  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,
  ) { }
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return await createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find()
      .populate('tipoDocumento')
      .populate('tipoSeguro')
      .exec();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id)
      .populate('tipoDocumento')
      .populate('tipoSeguro')
      .exec();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientModel.findByIdAndUpdate(
      id,
      updatePatientDto,
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

  async remove(id: string) {
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
