import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { ArrayMinSize, ArrayNotEmpty, Equals, IsArray, IsNotEmpty } from 'class-validator'

@InputType('SurfaceInput')
@ObjectType()
export class Surface {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @IsNotEmpty()
  @Equals('Polygon')
  @Field()
  type: string
}