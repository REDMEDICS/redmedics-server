import { Module } from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { UbigeoController } from './ubigeo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ubigeo, UbigeoSchema } from './schemas/ubigeo.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ubigeo.name, schema: UbigeoSchema }]),
  ],
  controllers: [UbigeoController],
  providers: [UbigeoService],
})
export class UbigeoModule {}
