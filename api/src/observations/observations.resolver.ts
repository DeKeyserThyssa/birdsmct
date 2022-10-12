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
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { Area } from 'src/areas/entities/area.entity'
import { AreasService } from 'src/areas/areas.service'
import { Bird } from 'src/birds/entities/bird.entity'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdService: BirdsService,
    private readonly areaService: AreasService,
  ) {}

  @ResolveField()
  bird(@Parent() o: Observation): Promise<Bird> {
    return this.birdService.findOne(o.birdId)
  }

  @ResolveField()
  area(@Parent() o: Observation): Promise<Area> {
    return this.areaService.findOne(o.areaId)
  }

  @Mutation(() => Observation)
  createObservation(
    @Args('createObservationInput')
    createObservationInput: CreateObservationInput,
  ) {
    return this.observationsService.create(createObservationInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Observation], { name: 'observations' })
  findAll(@CurrentUser() user) {
    console.log(user.uid)
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ) {
    return this.observationsService.update(
      updateObservationInput.id,
      updateObservationInput,
    )
  }

  @Mutation(() => Observation)
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
