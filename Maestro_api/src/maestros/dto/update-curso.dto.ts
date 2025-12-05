import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCursoDto {
    @IsOptional()
    @IsNumber()
    id_maestro?: number;

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    clave?: string;

    @IsOptional()
    @IsString()
    grupo?: string;

    @IsOptional()
    @IsString()
    horario?: string;

    @IsOptional()
    @IsString()
    salon?: string;
}
