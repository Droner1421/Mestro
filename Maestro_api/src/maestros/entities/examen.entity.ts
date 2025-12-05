import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Curso } from "./curso.entity";

@Entity("Examen")
export class Examen {
    @PrimaryGeneratedColumn({ name: "id_examen" })
    id_examen: number;

    @Column({ name: "id_curso" })
    id_curso: number;

    @Column()
    tipo: string;

    @Column({ type: 'varchar' })
    fecha: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    promedio: number;

    @Column({ type: 'text', nullable: true })
    comentarios: string;

    @ManyToOne(() => Curso, (curso) => curso.examenes)
    @JoinColumn({ name: "id_curso" })
    curso: Curso;
}
