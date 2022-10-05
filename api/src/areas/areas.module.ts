import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasResolver } from './areas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Observation } from 'src/observations/entities/observation.entity';
import { ObservationsService } from 'src/observations/observations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Area, Observation])],
  providers: [AreasResolver, AreasService, ObservationsService]
})
export class AreasModule {}
