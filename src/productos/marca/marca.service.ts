import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MarcaService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect() 
  }
  async create(createMarcaDto: CreateMarcaDto) {

    

    return await this.marca.create({data:createMarcaDto})
  }

  async findAll() {
    return await this.marca.findMany({});
  }

  async findOne(id: number) {
    return await this.marca.findMany({where:{id_marca:id}});
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }


  

}
