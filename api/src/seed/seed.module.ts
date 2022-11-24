import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from '../birds/entities/bird.entity'
import { DatabaseSeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { CommandModule } from 'nestjs-command' //https://www.npmjs.com/package/nestjs-command
import { Area } from 'src/areas/entities/area.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Area]), CommandModule], //<---import CommandModule
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}