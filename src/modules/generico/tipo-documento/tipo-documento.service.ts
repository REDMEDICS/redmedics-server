import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoDocumento } from './schemas/tipo-documento.schema';
import { Model } from 'mongoose';
import { Country } from '../country/schemas/country.schemas';

@Injectable()
export class TipoDocumentoService {

  constructor(
    @InjectModel(TipoDocumento.name)
    private readonly tipoDocumentoModel: Model<TipoDocumento>,
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) { }
  async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return await this.tipoDocumentoModel.create(createTipoDocumentoDto);
  }

  async findAll() {
    return await this.tipoDocumentoModel.find().select('nombre nombreCorto expresionRegular _id').lean();
  }

  async findOne(id: string) {
    const tipo = await this.tipoDocumentoModel.findById(id).exec();
    if (!tipo) {
      throw new NotFoundException(`TipoDocumento con ID ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: string, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    const actualizado = await this.tipoDocumentoModel.findByIdAndUpdate(id, updateTipoDocumentoDto, {
      new: true,
    }).exec();

    if (!actualizado) {
      throw new NotFoundException(`TipoDocumento con ID ${id} no encontrado`);
    }
    return actualizado;
  }

  remove(id: string) {
    return `This action removes a #${id} tipoDocumento`;
  }
}
