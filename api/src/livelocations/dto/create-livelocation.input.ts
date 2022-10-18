import { InputType, Int, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { GeoPoint } from 'src/areas/entities/geopoint.entity'
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'


@InputType()
export class CreateLivelocationInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'User id' })
  idUser: string

  @IsNotEmpty()
  @ValidateNested()
  @Type((type) => GeoPoint)
  @Field(() => GeoPoint, { description: 'Geolocation' })
  geolocation: Point
}
