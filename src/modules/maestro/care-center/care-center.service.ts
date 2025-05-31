import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareCenterDto } from './dto/create-care-center.dto';
import { UpdateCareCenterDto } from './dto/update-care-center.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CareCenter } from './schemas/care-center.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { NewCareCenterDto } from './dto/new-care-center.dto';
import { Permission } from '@modules/seguridad/permission/schemas/permission.schema';
import { User } from '@modules/seguridad/user/schemas/user.schema';

@Injectable()
export class CareCenterService {

  constructor(
    @InjectModel(CareCenter.name) private readonly careCenterModel: Model<CareCenter>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }
  async create(createCareCenterDto: CreateCareCenterDto, userId: ObjectId) {
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
      createdBy: userId
    });
    await this.userModel.findByIdAndUpdate(
      userId,
      { role: roleId, $addToSet: { centers: careCenter._id } }
    );
    return careCenter;
  }

  async newCareCenter(newCareCenterDto: NewCareCenterDto, userId: ObjectId) {
    const careCenter = await this.careCenterModel.create({ ...newCareCenterDto, createdBy: userId });
    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { centers: careCenter._id } }
    );
    return careCenter;
  }

  async findAll(userId: ObjectId) {
    const data: any = await this.userModel
      .findById(userId)
      .select('centers')
      .populate('centers', '-roles -createdAt -updatedAt')
      .lean();
    return data.centers;
  }

  async findOne(id: string) {
    return this.careCenterModel.findById(id).select('-createdAt -updatedAt -createdBy').lean();
  }

  async update(id: string, updateCareCenterDto: UpdateCareCenterDto, userId: ObjectId) {
    const existingCenter = await this.careCenterModel.findById(id);
    if (!existingCenter) {
      throw new NotFoundException(`Centro con ID ${id} no encontrado`);
    }
    return `This action updates a #${id} careCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} careCenter`;
  }
}
