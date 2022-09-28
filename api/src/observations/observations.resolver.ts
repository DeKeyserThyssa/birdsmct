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
import { Area } from 'src/areas/entities/area.entity'
import { AreasService } from 'src/areas/areas.service'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdService: BirdsService,
    private readonly areaService: AreasService
  ) {}

  @ResolveField()
  bird(@Parent() o: Observation) {
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

  @Query(() => [Observation], { name: 'observations' })
  findAll() {
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
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
  removeObservation(@Args('id', { type: () => Int }) id: number) {
    return this.observationsService.remove(id)
  }
}
