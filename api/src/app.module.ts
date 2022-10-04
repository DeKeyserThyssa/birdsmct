import { ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { graphqlConfig } from './bootstrap/graphqlConfig'
import { typeORMConfig } from './bootstrap/typeORMConfig'
import { BirdsModule } from './birds/birds.module'
import { AreasModule } from './areas/areas.module';
import { ObservationsModule } from './observations/observations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    BirdsModule,
    AreasModule,
    ObservationsModule,
  ],
  // TODO: Enchancement? move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
