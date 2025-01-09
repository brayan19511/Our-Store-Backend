import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateMarcaDto {

    @IsString()
    @MaxLength(5)
    @MinLength(5)
    cod_marca: string;
    
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    descripcion:string


}
