import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AreasService } from 'src/areas/areas.service'
import { Area } from 'src/areas/entities/area.entity'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { NotificationsGateway } from './notifications.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Livelocation, Area])],
  providers: [NotificationsGateway, LivelocationsService, AreasService],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
