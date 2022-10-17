import { InputType, Int, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { GeoPoint } from 'src/areas/entities/geopoint.entity'

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

  @Field(() => GeoPoint, {nullable: true})
  geoPoint?: Point

  @Field({ nullable: true }) // GraphQL
  weather?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
