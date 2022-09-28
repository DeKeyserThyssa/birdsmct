import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';
import { Observation } from 'src/observations/entities/observation.entity';
import { BirdsService } from 'src/birds/birds.service';
import { Bird } from 'src/birds/entities/bird.entity';

@Resolver(() => Area)
export class AreasResolver {
  constructor(private readonly areasService: AreasService ) {}


  @Mutation(() => Area)
  createArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
    return this.areasService.create(createAreaInput);
  }

  @Query(() => [Area], { name: 'areas' })
  findAll() {
    return this.areasService.findAll();
  }

  @Query(() => Area, { name: 'area' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.areasService.findOne(id);
  }

  @Mutation(() => Area)
  updateArea(@Args('updateAreaInput') updateAreaInput: UpdateAreaInput) {
    return this.areasService.update(updateAreaInput.id, updateAreaInput);
  }

  @Mutation(() => Area)
  removeArea(@Args('id', { type: () => String }) id: string) {
    return this.areasService.remove(id);
  }
}
