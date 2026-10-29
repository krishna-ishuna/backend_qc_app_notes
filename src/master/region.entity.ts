import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { Project } from './project.entity.js';

@Entity('regions')
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nama_daerah: string;

    @OneToMany('Project', (project: any) => project.region)
    projects: Project[];
}