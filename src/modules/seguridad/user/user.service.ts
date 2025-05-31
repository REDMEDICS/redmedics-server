import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { DocumentType } from '@modules/generico/document-type/schemas/document-type.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(DocumentType.name)
    private readonly documentTypeModel: Model<DocumentType>,
  ) { }

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
  async findOne(id: ObjectId): Promise<any> {
    const user = await this.userModel
      .findById(id)
      .select('-refreshTokens -password -createdAt -updatedAt -__v -status -verifiedAccount')
      .populate('centers')
      .lean();

    if (!user || !user.role || !user.centers) {
      return user;
    }
    const roleIdStr = user.role.toString();
    const embeddedRole = user.centers
      .flatMap((center: any) => center.roles || [])
      .find((role: any) => role._id?.toString() === roleIdStr);

    return {
      ...user,
      role: embeddedRole ?? null,
    };
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
