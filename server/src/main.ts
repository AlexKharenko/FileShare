import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: ['http://localhost:8080', 'http://192.168.1.6:8080'],
    credentials: true,
  });
  await app.register(cookie);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
