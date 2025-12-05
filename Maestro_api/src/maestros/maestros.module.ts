import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaestrosService } from './maestros.service';
import { MaestrosController } from './maestros.controller';
import { Maestro } from './entities/maestro.entity';
import { Curso } from './entities/curso.entity';
import { Examen } from './entities/examen.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Maestro, Curso, Examen],
            "conexion-mysql"
        ),
    ],
    controllers: [MaestrosController],
    providers: [MaestrosService],
})
export class MaestrosModule {}
