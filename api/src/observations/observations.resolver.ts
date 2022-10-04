import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ObservationsService } from './observations.service'
import { Observation } from './entities/observation.entity'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { BirdsService } from 'src/birds/birds.service'
import { ClientMessage, MessageTypes } from 'src/entities/ClientMessage'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdService: BirdsService,
  ) {}

  @ResolveField()
  bird(@Parent() o: Observation) {
    return this.birdService.findOne(o.birdId)
  }

  @Mutation(() => Observation)
  createObservation(
    @Args('createObservationInput')
    createObservationInput: CreateObservationInput,
  ) {
    return this.observationsService.create(createObservationInput)
  }

  @Query(() => [Observation], { name: 'observations' })
  findAll(): Promise<Observation[]> {
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Observation> {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ): Promise<Observation> {
    return this.observationsService.update(
      updateObservationInput.id,
      updateObservationInput,
    )
  }

  @Mutation(() => ClientMessage)
  async removeObservation(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.observationsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.succes,
        message: 'Observation deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very long',
      statusCode: 400,
    }
  }
}
