import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maestro } from './entities/maestro.entity';
import { Curso } from './entities/curso.entity';
import { Examen } from './entities/examen.entity';
import { CreateMaestroDto } from './dto/create-maestro.dto';
import { UpdateMaestroDto } from './dto/update-maestro.dto';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';

@Injectable()
export class MaestrosService {
    constructor(
        @InjectRepository(Maestro, "conexion-mysql")
        private readonly repoMaestro: Repository<Maestro>,
        @InjectRepository(Curso, "conexion-mysql")
        private readonly repoCurso: Repository<Curso>,
        @InjectRepository(Examen, "conexion-mysql")
        private readonly repoExamen: Repository<Examen>,
    ) {}

    async createMaestro(data: CreateMaestroDto) {
        const maestro = this.repoMaestro.create(data);
        return await this.repoMaestro.save(maestro);
    }

    async findAllMaestros(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoMaestro
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.cursos", "curso")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("m.id_maestro", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOneMaestro(id: number) {
        const maestro = await this.repoMaestro.findOne({ where: { id_maestro: id } });
        if (!maestro) {
            throw new NotFoundException(`Maestro con ID ${id} no encontrado`);
        }
        return maestro;
    }

    async updateMaestro(id: number, data: UpdateMaestroDto) {
        await this.findOneMaestro(id);
        await this.repoMaestro.update(id, data);
        return await this.findOneMaestro(id);
    }

    async removeMaestro(id: number) {
        const maestro = await this.findOneMaestro(id);
        await this.repoMaestro.remove(maestro);
        return { message: `Maestro ${id} eliminado correctamente` };
    }


    async maestrosPorArea(area: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoMaestro
            .createQueryBuilder("m")
            .where("m.area = :area", { area })
            .leftJoinAndSelect("m.cursos", "curso")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("m.nombre", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async maestrosPorNivelAcademico(nivel_academico: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoMaestro
            .createQueryBuilder("m")
            .where("m.nivel_academico = :nivel_academico", { nivel_academico })
            .leftJoinAndSelect("m.cursos", "curso")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("m.nombre", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async createCurso(data: CreateCursoDto) {
        await this.findOneMaestro(data.id_maestro);
        const curso = this.repoCurso.create(data);
        return await this.repoCurso.save(curso);
    }

    async findAllCursos(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoCurso
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.maestro", "maestro")
            .leftJoinAndSelect("c.examenes", "examen")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("c.id_curso", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOneCurso(id: number) {
        const curso = await this.repoCurso.findOne({ 
            where: { id_curso: id },
            relations: ['maestro', 'examenes']
        });
        if (!curso) {
            throw new NotFoundException(`Curso con ID ${id} no encontrado`);
        }
        return curso;
    }

    async updateCurso(id: number, data: UpdateCursoDto) {
        await this.findOneCurso(id);
        if (data.id_maestro) {
            await this.findOneMaestro(data.id_maestro);
        }
        await this.repoCurso.update(id, data);
        return await this.findOneCurso(id);
    }

    async removeCurso(id: number) {
        const curso = await this.findOneCurso(id);
        await this.repoCurso.remove(curso);
        return { message: `Curso ${id} eliminado correctamente` };
    }

    async cursosPorMaestro(id_maestro: number, page: number = 1, limit: number = 10, baseUrl: string) {
        await this.findOneMaestro(id_maestro);
        
        const [data, total] = await this.repoCurso
            .createQueryBuilder("c")
            .where("c.id_maestro = :id_maestro", { id_maestro })
            .leftJoinAndSelect("c.maestro", "maestro")
            .leftJoinAndSelect("c.examenes", "examen")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("c.nombre", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async cursosPorGrupo(grupo: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoCurso
            .createQueryBuilder("c")
            .where("c.grupo = :grupo", { grupo })
            .leftJoinAndSelect("c.maestro", "maestro")
            .leftJoinAndSelect("c.examenes", "examen")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("c.nombre", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async cursosConcExamenes(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoCurso
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.maestro", "maestro")
            .leftJoinAndSelect("c.examenes", "examen")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("c.id_curso", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async createExamen(data: CreateExamenDto) {
        await this.findOneCurso(data.id_curso);
        const examen = this.repoExamen.create(data);
        return await this.repoExamen.save(examen);
    }

    async findAllExamenes(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoExamen
            .createQueryBuilder("e")
            .leftJoinAndSelect("e.curso", "curso")
            .leftJoinAndSelect("curso.maestro", "maestro")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.id_examen", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOneExamen(id: number) {
        const examen = await this.repoExamen.findOne({ 
            where: { id_examen: id },
            relations: ['curso', 'curso.maestro']
        });
        if (!examen) {
            throw new NotFoundException(`Examen con ID ${id} no encontrado`);
        }
        return examen;
    }

    async updateExamen(id: number, data: UpdateExamenDto) {
        await this.findOneExamen(id);
        if (data.id_curso) {
            await this.findOneCurso(data.id_curso);
        }
        await this.repoExamen.update(id, data);
        return await this.findOneExamen(id);
    }

    async removeExamen(id: number) {
        const examen = await this.findOneExamen(id);
        await this.repoExamen.remove(examen);
        return { message: `Examen ${id} eliminado correctamente` };
    }

    async examensPorTipo(tipo: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoExamen
            .createQueryBuilder("e")
            .where("e.tipo = :tipo", { tipo })
            .leftJoinAndSelect("e.curso", "curso")
            .leftJoinAndSelect("curso.maestro", "maestro")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.fecha", "DESC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async examensPorFecha(fecha: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoExamen
            .createQueryBuilder("e")
            .where("e.fecha = :fecha", { fecha })
            .leftJoinAndSelect("e.curso", "curso")
            .leftJoinAndSelect("curso.maestro", "maestro")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.id_examen", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async contarExamenesPorCurso(id_curso: number) {
        await this.findOneCurso(id_curso);
        
        const count = await this.repoExamen
            .createQueryBuilder("e")
            .where("e.id_curso = :id_curso", { id_curso })
            .getCount();

        return {
            id_curso,
            total_examenes: count
        };
    }
}
