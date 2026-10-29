import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// Hapus import Project dari atas jika menyebabkan circular dependency, 
// atau gunakan import type saja:
import type { Project } from './project.entity.js';

@Entity('units')
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_id: number;

    @ManyToOne('Project', (project: any) => project.units, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ type: 'varchar', length: 50 })
    nama_unit: string;

    @Column({ type: 'int', default: 1 })
    current_termin: number;
}