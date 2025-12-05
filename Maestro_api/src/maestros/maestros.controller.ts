import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Req } from '@nestjs/common';
import { MaestrosService } from './maestros.service';
import { CreateMaestroDto } from './dto/create-maestro.dto';
import { UpdateMaestroDto } from './dto/update-maestro.dto';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import * as express from 'express';

@Controller('maestros')
export class MaestrosController {
    constructor(private readonly maestrosService: MaestrosService) {}


    @Post()
    createMaestro(@Body(new ValidationPipe()) data: CreateMaestroDto) {
        return this.maestrosService.createMaestro(data);
    }

    @Get()
    async findAllMaestros(
        @Req() req: express.Request,
        @Query('page') page?: string,
        @Query('limit') limit?: string
    ) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros`;
        return this.maestrosService.findAllMaestros(pageNum, limitNum, baseUrl);
    }

    @Get('area/:area')
    async maestrosPorArea(
        @Param('area') area: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/area`;
        return this.maestrosService.maestrosPorArea(area, Number(page), Number(limit), baseUrl);
    }

    @Get('nivel-academico/:nivel_academico')
    async maestrosPorNivelAcademico(
        @Param('nivel_academico') nivel_academico: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/nivel-academico`;
        return this.maestrosService.maestrosPorNivelAcademico(nivel_academico, Number(page), Number(limit), baseUrl);
    }

    @Get(':id')
    findOneMaestro(@Param('id') id: number) {
        return this.maestrosService.findOneMaestro(Number(id));
    }

    @Patch(':id')
    updateMaestro(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateMaestroDto) {
        return this.maestrosService.updateMaestro(Number(id), data);
    }

    @Delete(':id')
    removeMaestro(@Param('id') id: number) {
        return this.maestrosService.removeMaestro(Number(id));
    }


    @Post('curso')
    createCurso(@Body(new ValidationPipe()) data: CreateCursoDto) {
        return this.maestrosService.createCurso(data);
    }

    @Get('cursos/all')
    async findAllCursos(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/cursos/all`;
        return this.maestrosService.findAllCursos(Number(page), Number(limit), baseUrl);
    }

    @Get('cursos/maestro/:id_maestro')
    async cursosPorMaestro(
        @Param('id_maestro') id_maestro: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/cursos/maestro`;
        return this.maestrosService.cursosPorMaestro(Number(id_maestro), Number(page), Number(limit), baseUrl);
    }

    @Get('cursos/grupo/:grupo')
    async cursosPorGrupo(
        @Param('grupo') grupo: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/cursos/grupo`;
        return this.maestrosService.cursosPorGrupo(grupo, Number(page), Number(limit), baseUrl);
    }

    @Get('cursos/con-examenes')
    async cursosConcExamenes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/cursos/con-examenes`;
        return this.maestrosService.cursosConcExamenes(Number(page), Number(limit), baseUrl);
    }

    @Get('cursos/:id')
    findOneCurso(@Param('id') id: number) {
        return this.maestrosService.findOneCurso(Number(id));
    }

    @Patch('cursos/:id')
    updateCurso(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateCursoDto) {
        return this.maestrosService.updateCurso(Number(id), data);
    }

    @Delete('cursos/:id')
    removeCurso(@Param('id') id: number) {
        return this.maestrosService.removeCurso(Number(id));
    }


    @Post('examen')
    createExamen(@Body(new ValidationPipe()) data: CreateExamenDto) {
        return this.maestrosService.createExamen(data);
    }

    @Get('examenes/all')
    async findAllExamenes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/examenes/all`;
        return this.maestrosService.findAllExamenes(Number(page), Number(limit), baseUrl);
    }

    @Get('examenes/tipo/:tipo')
    async examensPorTipo(
        @Param('tipo') tipo: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/examenes/tipo`;
        return this.maestrosService.examensPorTipo(tipo, Number(page), Number(limit), baseUrl);
    }

    @Get('examenes/fecha/:fecha')
    async examensPorFecha(
        @Param('fecha') fecha: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/maestros/examenes/fecha`;
        return this.maestrosService.examensPorFecha(fecha, Number(page), Number(limit), baseUrl);
    }

    @Get('examenes/contar/:id_curso')
    contarExamenesPorCurso(@Param('id_curso') id_curso: number) {
        return this.maestrosService.contarExamenesPorCurso(Number(id_curso));
    }

    @Get('examenes/:id')
    findOneExamen(@Param('id') id: number) {
        return this.maestrosService.findOneExamen(Number(id));
    }

    @Patch('examenes/:id')
    updateExamen(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateExamenDto) {
        return this.maestrosService.updateExamen(Number(id), data);
    }

    @Delete('examenes/:id')
    removeExamen(@Param('id') id: number) {
        return this.maestrosService.removeExamen(Number(id));
    }
}
