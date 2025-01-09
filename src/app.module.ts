import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
