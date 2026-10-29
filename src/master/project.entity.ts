import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import type { Region } from './region.entity.js';
import type { Unit } from './unit.entity.js';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region_id: number;

    @ManyToOne('Region', (region: any) => region.projects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'region_id' })
    region: Region;

    @Column({ type: 'varchar', length: 150 })
    nama_proyek: string;

    @OneToMany('Unit', (unit: any) => unit.project)
    units: Unit[];
}