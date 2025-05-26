import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DocumentType } from 'src/modules/document-type/schemas/document-type.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(DocumentType.name)
    private readonly documentTypeModel: Model<DocumentType>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const documentType = await this.documentTypeModel.findById(
      createUserDto.person.documentType,
    );
    if (!documentType) throw new NotFoundException('Document type not found');

    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: ObjectId): Promise<User | null> {
    return await this.userModel
      .findById(id)
      .select('-refreshTokens -password')
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
          model: 'Permission',
          select: 'name code description',
        },
      })
      .exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
