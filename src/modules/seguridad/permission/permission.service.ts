import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  validateDocumentExists,
  validateNoRelatedDocuments,
  validateObjectId,
} from 'src/common/utils/mongo-validation.utils';
import { Permission } from './schemas/permission.schema';
import { Role } from '@modules/maestro/care-center/schemas/care-center.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';


@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) { }

  async findAll() {
    return this.permissionModel.find().exec();
  }

  async findOne(id: string) {
    validateObjectId(id);

    return validateDocumentExists(
      this.permissionModel.findById(id).exec(),
      'Permission',
    );
  }

  async create(permissionDto: CreatePermissionDto) {
    return this.permissionModel.create(permissionDto);
  }

  async update(id: string, permissionDto: UpdatePermissionDto) {
    validateObjectId(id);

    await validateDocumentExists(
      this.permissionModel.findById(id).exec(),
      'Permission',
    );

    return this.permissionModel
      .findByIdAndUpdate(id, permissionDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    validateObjectId(id);

    await validateDocumentExists(
      this.permissionModel.findById(id).exec(),
      'Permission',
    );

    await validateNoRelatedDocuments(
      this.roleModel,
      { permissions: id },
      'Permission is used in a role, cannot be deleted',
    );

    return this.permissionModel.findByIdAndDelete(id).exec();
  }

  async generateAndInsertPermissions() {
    const entities = [
      "users", "countries"
    ];

    const actions = ["create", "read", "update", "delete", "activate"];
    const actionTranslations: Record<string, string> = {
      "create": "Crear",
      "read": "Ver",
      "update": "Actualizar",
      "delete": "Eliminar",
      "activate": "Activar"
    };

    const entityTranslations: Record<string, string> = {
      "users": "Usuarios",
      "countries": "Países"
    };
    const actionDescription: Record<string, string> = {
      "create": "Permite crear",
      "read": "Permite ver",
      "update": "Permite actualizar",
      "delete": "Permite eliminar",
      "activate": "Permite activar"
    };

    const permissions: any = [];

    for (const entity of entities) {
      for (const action of actions) {
        const code = `${action}_${entity}`;
        const name = `${actionTranslations[action]} ${entityTranslations[entity]}`;
        const description = `${actionDescription[action]} ${entityTranslations[entity].toLowerCase()}`;
        const exists = await this.permissionModel.exists({ code });
        if (!exists) {
          permissions.push({
            name,
            code,
            description,
            status: true,
          });
        }
      }
    }

    if (permissions.length > 0) {
      await this.permissionModel.insertMany(permissions);
      console.log(`Se insertaron ${permissions.length} permisos`);
    } else {
      console.log(`Todos los permisos ya existen`);
    }
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
