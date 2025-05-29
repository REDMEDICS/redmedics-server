import { Injectable } from '@nestjs/common';
import { CreateCareCenterDto } from './dto/create-care-center.dto';
import { UpdateCareCenterDto } from './dto/update-care-center.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CareCenter } from './schemas/care-center.schema';
import { Model, Types } from 'mongoose';
import { Permission } from '../permission/schemas/permission.schema';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class CareCenterService {

  constructor(
    @InjectModel(CareCenter.name) private readonly careCenterModel: Model<CareCenter>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }
  async create(createCareCenterDto: CreateCareCenterDto, userId: any) {
    const permissions = await this.permissionModel.find().select('code -_id').lean();
    const permissionCodes = permissions.map(p => p.code);
    const roleId = new Types.ObjectId();
    const careCenter = await this.careCenterModel.create({
      ...createCareCenterDto,
      roles: [{
        _id: roleId,
        name: 'ADMINISTRADOR',
        permissions: permissionCodes,
        description: 'Perfil administrador',
        status: true
      }],
      createdBy: userId,
      userId
    });
    await this.userModel.findByIdAndUpdate(
      userId,
      { role: roleId, $addToSet: { centers: careCenter._id } }
    );
    return careCenter;
  }

  findAll() {
    return `This action returns all careCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careCenter`;
  }

  update(id: number, updateCareCenterDto: UpdateCareCenterDto) {
    return `This action updates a #${id} careCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} careCenter`;
  }
}
