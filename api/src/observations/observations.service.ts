import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObservationInput } from './dto/create-observation.input';
import { UpdateObservationInput } from './dto/update-observation.input';
import { Observation } from './entities/observation.entity';
import { ObjectId } from 'mongodb';
import { UsersService } from 'src/users/users.service';
import { BirdsService } from 'src/birds/birds.service';
import { AreasService } from 'src/areas/areas.service';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    private readonly birdService: BirdsService,
    private readonly areasService: AreasService,
    private readonly userService: UsersService,
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    // return 'This action adds a new observation'
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.userId = createObservationInput.userId
    o.birdId = createObservationInput.birdId
    o.areaId = createObservationInput.areaId
    o.geolocation = createObservationInput.geoPoint
    o.active = createObservationInput.active

    console.log('USER', o.userId)

    this.birdService.incrementObservation(o.birdId)
    this.areasService.incrementLocation(o.areaId, [o])
    this.userService.incrementObservation(o.userId, [o])

    return this.observationRepository.save(o)
  }


  findAll(): Promise<Observation[]>  {
    return this.observationRepository.find();
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOne(new ObjectId(id));
  }

  update(updateObservationInput: UpdateObservationInput) {
    const update = new Observation()
    update.id = updateObservationInput.id
    update.name = updateObservationInput.name
    update.description = updateObservationInput.description
    update.weather = updateObservationInput.weather
    update.birdId = updateObservationInput.birdId
    update.areaId = updateObservationInput.areaId
    update.geolocation = updateObservationInput.geoPoint
    update.active = updateObservationInput.active
    return this.observationRepository.save(update)
  }

  remove(id: string) {
    return this.observationRepository.delete(new ObjectId(id));
  }
}
