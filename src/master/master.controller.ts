import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity.js';
import { Project } from './project.entity.js';
import { Unit } from './unit.entity.js';

@Controller('api/master')
export class MasterController {
    constructor(
        @InjectRepository(Region) private regionRepo: Repository<Region>,
        @InjectRepository(Project) private projectRepo: Repository<Project>,
        @InjectRepository(Unit) private unitRepo: Repository<Unit>,
    ) { }

    // --- REGION ---
    @Post('regions')
    async createRegion(@Body('nama_daerah') nama_daerah: string) {
        const region = this.regionRepo.create({ nama_daerah });
        return await this.regionRepo.save(region);
    }

    @Get('regions')
    async getRegions() {
        return await this.regionRepo.find({
            relations: {
                projects: {
                    units: true,
                }
            }
        });
    }

    // --- PROJECT ---
    @Post('projects')
    async createProject(@Body() body: { region_id: number; nama_proyek: string }) {
        const project = this.projectRepo.create(body);
        return await this.projectRepo.save(project);
    }

    // --- UNIT ---
    @Post('units')
    async createUnit(@Body() body: { project_id: number; nama_unit: string }) {
        const unit = this.unitRepo.create(body);
        return await this.unitRepo.save(unit);
    }
}