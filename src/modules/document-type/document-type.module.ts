import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/schemas/user.schema';
import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeService } from './document-type.service';
import {
  DocumentType,
  DocumentTypeSchema,
} from './schemas/document-type.schema';
import { Country, CountrySchema } from '../country/schemas/country.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
