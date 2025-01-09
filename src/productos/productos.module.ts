import { Module } from '@nestjs/common';
import { RubroModule } from './rubro/rubro.module';
import { MarcaModule } from './marca/marca.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [RubroModule, MarcaModule, ProductoModule]
})
export class ProductosModule {}
