import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoDocumento, TipoDocumentoSchema } from './schemas/tipo-documento.schema';
import { Country, CountrySchema } from '../country/schemas/country.schemas';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: TipoDocumento.name, schema: TipoDocumentoSchema },
        { name: Country.name, schema: CountrySchema },
      ])
    ],
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService],
})
export class TipoDocumentoModule {}
