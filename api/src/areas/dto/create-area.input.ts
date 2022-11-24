import { InputType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Polygon } from 'geojson'

import { Surface } from '../entities/surface.area'

@InputType()
export class CreateAreaInput {
  @IsString() // Validation
  @IsNotEmpty() // Validation
  @MinLength(5)
  @Field() // GraphQL
  name: string

  @IsNotEmpty() // Validation
  @ValidateNested()
  @Type((type) => Surface)
  @Field(() => Surface)
  surface: Polygon
}
