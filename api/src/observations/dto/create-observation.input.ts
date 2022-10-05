import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateObservationInput {
  @Field() // GraphQL
  name: string

  @Field() // GraphQL
  userId?: string

  @Field()
  birdId: string

  @Field()
  areaId: string

  @Field() // GraphQL
  weather?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
