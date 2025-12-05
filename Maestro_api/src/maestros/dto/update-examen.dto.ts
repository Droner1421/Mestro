import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateExamenDto {
    @IsOptional()
    @IsNumber()
    id_curso?: number;

    @IsOptional()
    @IsString()
    tipo?: string;

    @IsOptional()
    @IsString()
    fecha?: string;

    @IsOptional()
    @IsNumber()
    promedio?: number;

    @IsOptional()
    @IsString()
    comentarios?: string;
}
