import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RubroService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Rubro Service');

  async onModuleInit() {
    await this.$connect();
  }
  async create(createRubroDto: CreateRubroDto) {
    const validar = await this.findOne(createRubroDto.cod_rubro);

    if (validar)
      throw new BadRequestException(
        `Codigo de Rubro "${createRubroDto.cod_rubro}" ya existe`,
      );

    try {
      return await this.rubro.create({ data: createRubroDto });
    } catch (error) {
      this.handleExceptionError(error);
    }
  }

  async findAll() {
    return await this.rubro.findMany({ where: { activo: true } });
  }

  async findOne(rubro: string) {
    return await this.rubro.findFirst({ where: { cod_rubro: rubro } });
  }

  async update(rubro: string, updateRubroDto: UpdateRubroDto) {
    const { cod_rubro, ...data } = updateRubroDto;
    const fecha_modificacion = new Date();
    const validar = await this.findOne(rubro);
    if (!validar) throw new BadRequestException(`Rubro "${rubro} no existe."`);
    try {
      return await this.rubro.update({
        where: { cod_rubro: rubro },
        data: { ...data, fecha_modificacion },
      });
    } catch (error) {
      this.handleExceptionError(error);
    }
  }

  async remove(rubro: string) {
    const fecha_modificacion = new Date();
    const validar = await this.findOne(rubro);
    if (!validar) throw new BadRequestException(`Rubro "${rubro} no existe."`);
    try {
      await this.rubro.update({where:{cod_rubro:rubro},data:{activo:false,fecha_modificacion}})
      return `El rubro  #${rubro} ya no esta disponible`;
    } catch (error) {
      
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
