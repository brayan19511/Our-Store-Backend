import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RubroService } from './rubro.service';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';

@Controller('rubro')
export class RubroController {
  constructor(private readonly rubroService: RubroService) {}

  @Post()
  create(@Body() createRubroDto: CreateRubroDto) {
    return this.rubroService.create(createRubroDto);
  }

  @Get()
  findAll() {
    return this.rubroService.findAll();
  }

  @Get(':rubro')
  findOne(@Param('rubro') rubro: string) {
    return this.rubroService.findOne(rubro);
  }

  @Patch(':rubro')
  update(@Param('rubro') rubro: string, @Body() updateRubroDto: UpdateRubroDto) {
    return this.rubroService.update(rubro, updateRubroDto);
  }

  @Delete(':rubro')
  remove(@Param('rubro') rubro: string) {
    return this.rubroService.remove(rubro);
  }
}
