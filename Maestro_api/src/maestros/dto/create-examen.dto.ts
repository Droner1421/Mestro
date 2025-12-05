import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExamenDto {
    @IsNumber()
    id_curso: number;

    @IsString()
    tipo: string;

    @IsString()
    fecha: string;

    @IsNumber()
    promedio: number;

    @IsOptional()
    @IsString()
    comentarios?: string;
}
