import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  validateDocumentExists,
  validateObjectId,
} from 'src/common/utils/mongo-validation.utils';


import { DocumentType } from './schemas/document-type.schema';
import { Country } from '../country/schemas/country.schemas';
import { User } from '@modules/seguridad/user/schemas/user.schema';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectModel(DocumentType.name)
    private readonly documentTypeModel: Model<DocumentType>,
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeModel.find().populate('country', 'name').exec();
  }

  async findOne(id: string) {
    validateObjectId(id);

    return validateDocumentExists(
      this.documentTypeModel.findById(id).populate('country', 'name').exec(),
      'Document Type',
    );
  }

  async create(documentTypeDto: CreateDocumentTypeDto) {
    await validateDocumentExists(
      this.countryModel.findById(documentTypeDto.country).exec(),
      'Country',
    );

    return this.documentTypeModel.create(documentTypeDto);
  }

  async update(id: string, documentTypeDto: UpdateDocumentTypeDto) {
    validateObjectId(id);

    await validateDocumentExists(
      this.documentTypeModel.findById(id).exec(),
      'Document Type',
    );

    await validateDocumentExists(
      this.countryModel.findById(documentTypeDto.country).exec(),
      'Country',
    );

    return this.documentTypeModel
      .findByIdAndUpdate(id, documentTypeDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    // validateObjectId(id);

    // await validateDocumentExists(
    //   this.documentTypeModel.findById(id).exec(),
    //   'Document Type',
    // );

    // await validateNoRelatedDocuments(
    //   this.userModel,
    //   { 'person.documentType': id },
    //   'Document type is being used by a user, cannot be deleted',
    // );

    // return this.documentTypeModel.findByIdAndDelete(id).exec();
  }
}
