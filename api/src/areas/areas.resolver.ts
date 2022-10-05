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
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { ObservationsService } from '../observations/observations.service'

@Resolver(() => Area)
export class AreasResolver {
  constructor(
    private readonly areasService: AreasService,
    private readonly observationService: ObservationsService,
  ) {}

  // @ResolveField()
  // observations(@Parent() a: Area) {
  //   return this.observationService.findOne(a.observationId)
  // }
  @Mutation(() => Area)
  createArea(
    @Args('createAreaInput') createAreaInput: CreateAreaInput,
  ): Promise<Area> {
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
    return this.areasService.update(updateAreaInput)
  }

  @Mutation(() => Area)
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
