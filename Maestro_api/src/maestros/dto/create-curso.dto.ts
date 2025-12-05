import { IsString, IsNumber } from 'class-validator';

export class CreateCursoDto {
    @IsNumber()
    id_maestro: number;

    @IsString()
    nombre: string;

    @IsString()
    clave: string;

    @IsString()
    grupo: string;

    @IsString()
    horario: string;

    @IsString()
    salon: string;
}
