import { AppFactory } from './app.factory';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const { appPromise } = AppFactory.create();

  const app = await appPromise;
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
