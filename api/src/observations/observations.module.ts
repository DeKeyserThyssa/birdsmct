import { Module } from '@nestjs/common'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Observation } from './entities/observation.entity'
import { AreasService } from 'src/areas/areas.service'
import { Area } from 'src/areas/entities/area.entity'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Area, Observation, User]), NotificationsModule],
  providers: [
    ObservationsResolver,
    ObservationsService,
    BirdsService,
    AreasService,
    UsersService
  ],
})
export class ObservationsModule {}
