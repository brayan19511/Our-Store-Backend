import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaDto } from './create-marca.dto';

export class UpdateMarcaDto extends PartialType(CreateMarcaDto) {

    
    fecha_modificacion:Date


    activo:boolean


}
