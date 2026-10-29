import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('checklist_templates')
export class ChecklistTemplate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    termin_number: number; // 1 - 15

    @Column({ type: 'varchar', length: 150 })
    category: string; // Misal: "1. Pekerjaan Persiapan", "2. Pemasangan Bowplank & Galian"

    @Column({ type: 'text' })
    item_name: string; // Misal: "Cek kebenaran letak kavling"

    @Column({ type: 'int', default: 1 })
    sort_order: number; // Urutan tampilan item di form

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}