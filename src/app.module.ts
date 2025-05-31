import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { envValidationSchema } from './config/env-validation.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AuthModule, PermissionModule, UserModule } from '@modules/seguridad';
import { AreaModule, CareCenterModule, EspecialidadModule, TipoSeguroModule } from '@modules/maestro';
import { CountryModule, DocumentTypeModule, UbigeoModule } from '@modules/generico';
import { PatientModule, ProgramacionPersonalModule } from '@modules/admision';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [config],
      validationSchema: envValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CareCenterModule,
    PermissionModule,
    AuthModule,
    CountryModule,
    AreaModule,
    EspecialidadModule,
    UbigeoModule,
    DocumentTypeModule,
    PatientModule,
    ProgramacionPersonalModule,
    TipoSeguroModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule { }
