import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig } from './bootstrap/graphqlConfig';
import { typeORMConfig } from './bootstrap/typeORMConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig)],
   // TODO: Enchancement? move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
