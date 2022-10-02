import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateObservationInput {
  @Field() // GraphQL
  name: string

  @Field() // GraphQL
  userId: string

  @Field() // GraphQL
  weather: string

  @Field() //graphql
  birdId: string
}
