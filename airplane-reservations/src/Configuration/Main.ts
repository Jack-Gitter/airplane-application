import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: { host: '0.0.0.0', port: 5672 }
  })

  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
