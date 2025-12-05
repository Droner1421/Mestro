import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Curso } from "./curso.entity";

@Entity("Maestro")
export class Maestro {
    @PrimaryGeneratedColumn({ name: "id_maestro" })
    id_maestro: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    correo: string;

    @Column()
    area: string;

    @Column()
    nivel_academico: string;

    @Column({ type: 'varchar' })
    fecha_ingreso: string;

    @OneToMany(() => Curso, (curso) => curso.maestro, { eager: false })
    @JoinColumn({ name: "id_maestro" })
    cursos: Curso[];
}
