import { Module } from '@nestjs/common';
import { CentroAsistencialService } from './centro-asistencial.service';
import { CentroAsistencialController } from './centro-asistencial.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CentroAsistencial, CentroAsistencialSchema } from './schemas/centro-asistencial.schema';
import { Usuario, UsuarioSchema } from '@modules/seguridad/usuario/schemas/usuario.schema';
import { Permission, PermissionSchema } from '@modules/seguridad/permission/schemas/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CentroAsistencial.name, schema: CentroAsistencialSchema },
      { name: Usuario.name, schema: UsuarioSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [CentroAsistencialController],
  providers: [CentroAsistencialService],
})
export class CentroAsistencialModule { }
