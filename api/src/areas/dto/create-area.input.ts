import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAreaInput {
  @Field() // GraphQL
  name: string;

  @Field()
  area: string
}