import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { AreasService } from './areas.service'
import { Area } from './entities/area.entity'
import { CreateAreaInput } from './dto/create-area.input'
import { UpdateAreaInput } from './dto/update-area.input'
import { Observation } from 'src/observations/entities/observation.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Bird } from 'src/birds/entities/bird.entity'
import { ClientMessage, MessageTypes } from 'src/entities/ClientMessage'

@Resolver(() => Area)
export class AreasResolver {
  constructor(
    private readonly areasService: AreasService,
    private readonly birdService: BirdsService,
  ) {}

  @ResolveField()
  bird(@Parent() a: Area) {
    return this.birdService.findOne(a.birdId)
  }

  @Mutation(() => Area)
  createArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
    return this.areasService.create(createAreaInput)
  }

  @Query(() => [Area], { name: 'areas' })
  findAll(): Promise<Area[]> {
    return this.areasService.findAll()
  }

  @Query(() => Area, { name: 'area' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Area> {
    return this.areasService.findOne(id)
  }

  @Mutation(() => Area)
  updateArea(
    @Args('updateAreaInput') updateAreaInput: UpdateAreaInput,
  ): Promise<Area> {
    return this.areasService.update(updateAreaInput.id, updateAreaInput)
  }

  @Mutation(() => ClientMessage)
  async removeArea(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.areasService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.succes,
        message: 'Area deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very long',
      statusCode: 400,
    }
  }
}
