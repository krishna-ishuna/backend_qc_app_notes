import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminForm } from './termin-form.entity.js';
import { ChecklistTemplate } from './checklist-template.entity.js';
import { ChecklistController } from './checklist.controller.js'; // <-- Ubah ke .js

@Module({
    imports: [TypeOrmModule.forFeature([TerminForm, ChecklistTemplate])],
    controllers: [ChecklistController],
})
export class ChecklistModule { }