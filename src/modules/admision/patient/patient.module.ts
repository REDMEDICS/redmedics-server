import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schemas';
// import { DocumentType, DocumentTypeSchema } from '@modules/generico/document-type/schemas/document-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      // { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
