import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCentroAsistencialDto } from './dto/create-centro-asistencial.dto';
import { UpdateCentroAsistencialDto } from './dto/update-centro-asistencial.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CentroAsistencial } from './schemas/centro-asistencial.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { Permission } from '@modules/seguridad/permission/schemas/permission.schema';
import { Usuario } from '@modules/seguridad/usuario/schemas/usuario.schema';
import { RegisterCentroAsistencialDto } from './dto/register-centro-asistencial.dto';
import { AccessAuthGuard } from '@common/guard';

@UseGuards(AccessAuthGuard)
@Injectable()
export class CentroAsistencialService {

  constructor(
    @InjectModel(CentroAsistencial.name) private readonly careCenterModel: Model<CentroAsistencial>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) { }

  async register(createCareCenterDto: RegisterCentroAsistencialDto, userId: string) {
    const permissions = await this.permissionModel.find().select('code -_id').lean();
    const permissionCodes = permissions.map(p => p.code);
    const centroAsistencial = await this.careCenterModel.create({
      ...createCareCenterDto,
      roles: [{
        nombre: 'ADMINISTRADOR',
        permisos: permissionCodes,
        descripcion: 'Perfil administrador',
        estado: true
      }],
      creadoPor: userId
    });
    await this.usuarioModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          centros: {
            centro: centroAsistencial._id,
            rol: 'ADMINISTRADOR'
          }
        }
      }
    );
    return centroAsistencial;
  }

  async create(createCentroAsistencialDto: CreateCentroAsistencialDto, userId: string) {
    const centroAsistencial = await this.careCenterModel.create({ ...createCentroAsistencialDto, creadoPor: userId });
    const rol = centroAsistencial.roles?.[0]?.nombre || null;
    await this.usuarioModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          centros: {
            centro: centroAsistencial._id,
            rol: rol
          }
        }
      }
    );
    return centroAsistencial;
  }



  async findAll(userId: string) {
    const result = await this.usuarioModel.aggregate([
      { $match:  { _id: new Types.ObjectId(userId) } },
      { $unwind: '$centros' },
      {
        $lookup: {
          from: 'centroasistencials',
          localField: 'centros.centro',
          foreignField: '_id',
          as: 'centroInfo'
        }
      },
      { $unwind: '$centroInfo' },
      {
        $project: {
          _id: '$centroInfo._id',
          nombre: '$centroInfo.nombre',
          telefono: '$centroInfo.telefono',
          direccion: '$centroInfo.direccion',
          imagen: '$centroInfo.imagen'
        }
      }
    ]);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} centroAsistencial`;
  }

  update(id: number, updateCentroAsistencialDto: UpdateCentroAsistencialDto) {
    return `This action updates a #${id} centroAsistencial`;
  }

  remove(id: number) {
    return `This action removes a #${id} centroAsistencial`;
  }
}
