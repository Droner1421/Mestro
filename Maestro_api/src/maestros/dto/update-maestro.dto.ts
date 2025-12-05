import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateMaestroDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellido?: string;

    @IsOptional()
    @IsEmail()
    correo?: string;

    @IsOptional()
    @IsString()
    area?: string;

    @IsOptional()
    @IsString()
    nivel_academico?: string;

    @IsOptional()
    @IsString()
    fecha_ingreso?: string;
}
