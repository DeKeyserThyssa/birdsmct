import { Module } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { BirdsResolver } from './birds.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bird } from './entities/bird.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bird]), AuthModule], 
  providers: [BirdsResolver, BirdsService]
})
export class BirdsModule {}
