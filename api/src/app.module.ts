import { ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { graphqlConfig } from './bootstrap/graphqlConfig'
import { typeORMConfig } from './bootstrap/typeORMConfig'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { BirdsModule } from './birds/birds.module'
import { AreasModule } from './areas/areas.module'
import { ObservationsModule } from './observations/observations.module'
import { DatabaseSeedModule } from './seed/seed.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    BootstrapModule,
    BirdsModule,
    AreasModule,
    ObservationsModule,
    DatabaseSeedModule,
  ],
  // TODO: Enchancement? move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
