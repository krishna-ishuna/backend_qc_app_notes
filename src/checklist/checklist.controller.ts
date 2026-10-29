import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerminForm } from './termin-form.entity.js';
import { ChecklistTemplate } from './checklist-template.entity.js';

@Controller('api/checklist')
export class ChecklistController {
    constructor(
        @InjectRepository(TerminForm)
        private terminFormRepo: Repository<TerminForm>,
        @InjectRepository(ChecklistTemplate)
        private templateRepo: Repository<ChecklistTemplate>,
    ) { }

    // 1. Ambil Template Master Item Checklist per Termin (Dipanggil oleh Frontend sebelum buat form)
    @Get('template/termin/:termin_number')
    async getTemplateByTermin(@Param('termin_number') terminNumber: number) {
        return await this.templateRepo.find({
            where: { termin_number: terminNumber },
            order: { category: 'ASC', sort_order: 'ASC' },
        });
    }

    // 2. Tambah Item Master Template Baru
    @Post('template')
    async createTemplate(@Body() body: {
        termin_number: number;
        category: string;
        item_name: string;
        sort_order?: number;
    }) {
        const newTemplate = this.templateRepo.create(body);
        return await this.templateRepo.save(newTemplate);
    }

    // 3. Simpan atau Update Hasil Inspeksi (Upsert: Jika unit & termin sudah ada, datanya ditimpa/di-update)
    @Post()
    async saveTerminForm(@Body() body: {
        unit_id: number;
        termin_number: number;
        checklist_data: any;
        inspector_id: number;
    }) {
        let existingForm = await this.terminFormRepo.findOne({
            where: { unit_id: body.unit_id, termin_number: body.termin_number },
        });

        if (existingForm) {
            // Jika termin untuk unit tersebut sudah ada, update datanya
            existingForm.checklist_data = body.checklist_data;
            existingForm.inspector_id = body.inspector_id;
            existingForm.status = 'submitted';
            return await this.terminFormRepo.save(existingForm);
        } else {
            // Jika belum ada, buat baru
            const newForm = this.terminFormRepo.create({
                unit_id: body.unit_id,
                termin_number: body.termin_number,
                checklist_data: body.checklist_data,
                inspector_id: body.inspector_id,
                status: 'submitted',
            });
            return await this.terminFormRepo.save(newForm);
        }
    }

    // 4. Ambil Data Checklist berdasarkan Unit dan Termin
    @Get('unit/:unit_id/termin/:termin_number')
    async getFormByUnitAndTermin(
        @Param('unit_id') unitId: number,
        @Param('termin_number') terminNumber: number,
    ) {
        return await this.terminFormRepo.findOne({
            where: { unit_id: unitId, termin_number: terminNumber },
            relations: {
                unit: true,
                inspector: true,
            },
        });
    }

    // 5. Update Status Approval (QC / Direktur)
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: number,
        @Body('status') status: string,
    ) {
        await this.terminFormRepo.update(id, { status });
        return { message: 'Status checklist berhasil diperbarui', status };
    }
}