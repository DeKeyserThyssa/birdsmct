import { Module } from '@nestjs/common'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { BirdsModule } from 'src/birds/birds.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Observation } from './entities/observation.entity'
import { AreasService } from 'src/areas/areas.service'
import { Area } from 'src/areas/entities/area.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Area, Observation]), BirdsModule],
  providers: [
    ObservationsResolver,
    ObservationsService,
    BirdsService,
    AreasService,
  ],
})
export class ObservationsModule {}
