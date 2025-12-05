import { IsString, IsEmail } from 'class-validator';

export class CreateMaestroDto {
    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsEmail()
    correo: string;

    @IsString()
    area: string;

    @IsString()
    nivel_academico: string;

    @IsString()
    fecha_ingreso: string;
}
