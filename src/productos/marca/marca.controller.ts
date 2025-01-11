import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcaService.create(createMarcaDto);
  }

  @Get()
  findAll() {
    return this.marcaService.findAll();
  }

  @Get(':marca')
  findOne(@Param('marca') marca: string) {
    return this.marcaService.findOne(marca);
  }

  @Patch(':marca')
  update(@Param('marca') marca: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcaService.update(marca, updateMarcaDto);
  }

  @Delete(':marca')
  remove(@Param('marca') marca: string) {
    return this.marcaService.remove(marca);
  }
}
