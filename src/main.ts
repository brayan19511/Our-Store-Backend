import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger=new Logger("Main Our Store")
  
  app.setGlobalPrefix('our-store')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )

  
  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Server running on port ${process.env.PORT}`)

}
bootstrap();
