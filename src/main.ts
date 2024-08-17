import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { tenancyMiddleware } from './modules/tenancy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(tenancyMiddleware);
  await app.listen(8000);
}
bootstrap();
