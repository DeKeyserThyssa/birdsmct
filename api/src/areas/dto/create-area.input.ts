import { InputType, Int, Field } from '@nestjs/graphql';
import { Polygon } from 'geojson';

import { Surface } from '../entities/surface.area';

@InputType()
export class CreateAreaInput {
  @Field() // GraphQL
  name: string;

  @Field(() => Surface)
  surface: Polygon
}