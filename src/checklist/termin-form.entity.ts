import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import type { Unit } from '../master/unit.entity.js';
import type { User } from '../users/user.entity.js';

@Entity('termin_forms')
export class TerminForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit_id: number;

    @ManyToOne('Unit', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @Column({ type: 'int' })
    termin_number: number;

    @Column({ type: 'varchar', length: 50, default: 'draft' })
    status: string;

    // Sesuaikan dengan kolom di database Anda (gunakan checklist_data atau form_data)
    @Column({ type: 'jsonb', nullable: true })
    checklist_data: any;

    @Column()
    inspector_id: number;

    @ManyToOne('User', { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'inspector_id' })
    inspector: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}