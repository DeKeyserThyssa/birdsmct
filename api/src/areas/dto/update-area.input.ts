import { CreateAreaInput } from './create-area.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateAreaInput extends PartialType(CreateAreaInput) {
  @Field()
  id: string
}
