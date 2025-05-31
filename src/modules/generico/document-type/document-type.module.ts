import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeService } from './document-type.service';
import {
  DocumentType,
  DocumentTypeSchema,
} from './schemas/document-type.schema';
import { Country, CountrySchema } from '../country/schemas/country.schemas';
import { User, UserSchema } from '@modules/seguridad/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentType.name, schema: DocumentTypeSchema },
      { name: Country.name, schema: CountrySchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
