import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BirdsService } from './birds.service';
import { BirdsResolver } from './birds.resolver';
import { Bird } from './entities/bird.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bird])], 
  providers: [BirdsResolver, BirdsService]
})
export class BirdsModule {}
