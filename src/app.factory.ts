import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

export class AppFactory {
  static create(): {
    appPromise: Promise<INestApplication<any>>;
    expressApp: express.Express;
  } {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const appPromise = NestFactory.create(AppModule, adapter);

    appPromise
      .then((app) => {
        app.setGlobalPrefix('v1');
        app.useGlobalPipes(
          new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
          }),
        );

        app.enableCors({
          origin: [
            'https://app.redmedics.com',
            'https://www.redmedics.com',
            'https://app.qa.redmedics.com',
            'http://localhost:4321',
            'http://localhost:9000'
          ],
          credentials: true,
        });

        app.use(helmet({ contentSecurityPolicy: false }));
        app.use(cookieParser());

        const options = new DocumentBuilder()
          .setTitle('Redmedics API')
          .setDescription('List of endpoints for Redmedics API')
          .setVersion('1.0')
          .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document, {
          jsonDocumentUrl: 'docs/json',
        });
        // if (process.env.NODE_ENV === 'development') {
        // }

        app.init();
      })
      .catch((err) => {
        throw err;
      });

    expressApp.use((req: express.Request, res: express.Response, next) => {
      appPromise
        .then(async (app) => {
          await app.init();
          next();
        })
        .catch((err) => next(err));
    });

    return { appPromise, expressApp };
  }
}