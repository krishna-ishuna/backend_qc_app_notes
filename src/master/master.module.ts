import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity.js';
import { Project } from './project.entity.js';
import { Unit } from './unit.entity.js';
import { MasterController } from './master.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Region, Project, Unit])],
    controllers: [MasterController],
})
export class MasterModule { }