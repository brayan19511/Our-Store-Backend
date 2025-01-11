import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateRubroDto {
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    cod_rubro: string;
    
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    descripcion:string



}
