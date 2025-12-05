import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Maestro } from './maestros/entities/maestro.entity';
import { Curso } from './maestros/entities/curso.entity';
import { Examen } from './maestros/entities/examen.entity';
import { MaestrosModule } from './maestros/maestros.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "conexion-mysql",
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "maestros",
            entities: [Maestro, Curso, Examen],
            synchronize: true,
            autoLoadEntities: true,
        }),

        MaestrosModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
