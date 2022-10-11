import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType('SurfaceInput')
@ObjectType()
export class Surface {
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @Field()
  type: string
}