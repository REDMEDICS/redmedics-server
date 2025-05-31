import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DocumentType, DocumentTypeSchema } from '@modules/generico/document-type/schemas/document-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: DocumentType.name, schema: DocumentTypeSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
