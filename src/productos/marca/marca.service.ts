import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MarcaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Marca Service');

  async onModuleInit() {
    await this.$connect();
  }

  async create(createMarcaDto: CreateMarcaDto) {
    const valdiar = await this.findOne(createMarcaDto.cod_marca);
    if (valdiar)
      throw new BadRequestException(
        `Codigo Marca "${createMarcaDto.cod_marca}" ya existe.`,
      );
    try {
      return await this.marca.create({ data: createMarcaDto });
    } catch (error) {
      this.handleExceptionError(error);
    }
  }

  async findAll() {
    return await this.marca.findMany({where:{activo:true}});
  }

  async findOne(marca: string) {
    return await this.marca.findFirst({ where: { cod_marca: marca } });
  }

  async update(marca: string, updateMarcaDto: UpdateMarcaDto) {
    const { cod_marca, ...data } = updateMarcaDto;
    const fecha_modificacion=new Date()
    const validar = await this.findOne(marca);
    if (!validar) throw new BadRequestException(`Marca "${marca}" no existe.`);
    try {
      return await this.marca.update({
        where: { cod_marca: marca },
        data: {...data,fecha_modificacion:fecha_modificacion},
        // select: { cod_marca: true },
      });
    } catch (error) {
      this.handleExceptionError(error);
    }
  }

  async remove(marca: string) {
    const fecha_modificacion=new Date()
    const validar = await this.findOne(marca);
    if (!validar) throw new BadRequestException(`Marca "${marca}" no existe.`);
    try {
      await this.marca.update({where:{cod_marca:marca},data:{activo:false,fecha_modificacion}})
      return `La Marca #${marca} ya no esta disponible`;
    } catch (error) {
      this.handleExceptionError(error)
    }

  
  }

  private handleExceptionError(error: any) {
    if (error.code == 'P2002')
      throw new BadRequestException(`${error.meta.modelName} already exist`);
    if (error.code === '23505') throw new BadRequestException(error.detail); //data duplicada
    this.logger.error(error);
    throw new InternalServerErrorException('Unespecte error check server!!');
  }
}
