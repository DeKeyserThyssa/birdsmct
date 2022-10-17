import { InputType, Int, Field } from '@nestjs/graphql'
import { CreateObservationInput } from 'src/observations/dto/create-observation.input'
import { Observation } from 'src/observations/entities/observation.entity'

@InputType()
export class CreateUserInput {
  @Field()
  uid: string

  @Field(() => [CreateObservationInput], {
    nullable: 'itemsAndList', //can return empty array []
    defaultValue: [],
  }) 
  observations?: Observation[]

  @Field(() => Int, { defaultValue: 0 })
  observationsCount?: number
}
