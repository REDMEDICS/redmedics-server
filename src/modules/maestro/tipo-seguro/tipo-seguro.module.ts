import { Module } from '@nestjs/common';
import { TipoSeguroService } from './tipo-seguro.service';
import { TipoSeguroController } from './tipo-seguro.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoSeguro, TipoSeguroSchema } from './schemas/tipo-seguro.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TipoSeguro.name, schema: TipoSeguroSchema },
    ]),
  ],
  controllers: [TipoSeguroController],
  providers: [TipoSeguroService],
})
export class TipoSeguroModule { }
