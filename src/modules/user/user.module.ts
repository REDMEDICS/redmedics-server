import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentType,
  DocumentTypeSchema,
} from 'src/modules/document-type/schemas/document-type.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: DocumentType.name, schema: DocumentTypeSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
