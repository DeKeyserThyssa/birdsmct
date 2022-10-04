import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasResolver } from './areas.resolver';
import { BirdsService } from 'src/birds/birds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bird } from 'src/birds/entities/bird.entity';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Area])],
  providers: [AreasResolver, AreasService, BirdsService]
})
export class AreasModule {}
