import { Module } from '@nestjs/common';
import { CareCenterService } from './care-center.service';
import { CareCenterController } from './care-center.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CareCenter, CareCenterSchema } from './schemas/care-center.schema';
import { Permission, PermissionSchema } from '../permission/schemas/permission.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CareCenter.name, schema: CareCenterSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CareCenterController],
  providers: [CareCenterService],
})
export class CareCenterModule { }
