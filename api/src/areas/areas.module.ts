import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasService } from './areas.service';
import { AreasResolver } from './areas.resolver';
import { Area } from './entities/area.entity';
import { Observation } from 'src/observations/entities/observation.entity';
import { ObservationsService } from 'src/observations/observations.service';
import { Bird } from 'src/birds/entities/bird.entity';
import { User } from 'src/users/entities/user.entity';
import { BirdsService } from 'src/birds/birds.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Area, Observation, Bird, User])],
  providers: [
    BirdsService,
    ObservationsService,
    UsersService,
    AreasResolver, 
    AreasService, 
    
  ]
})
export class AreasModule {}
