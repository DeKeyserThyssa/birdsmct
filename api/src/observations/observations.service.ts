import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateObservationInput } from './dto/create-observation.input';
import { UpdateObservationInput } from './dto/update-observation.input';
import { Observation } from './entities/observation.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    // return 'This action adds a new observation'
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.userId = createObservationInput.userId
    // o.birds = createObservationInput.bird
    o.birdId = createObservationInput.birdId
    // o.area = createObservationInput.area
    o.areaId = createObservationInput.areaId
    o.active = createObservationInput.active
    return this.observationRepository.save(o)
  }


  findAll(): Promise<Observation[]>  {
    return this.observationRepository.find();
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOne(new ObjectId(id));
  }

  update(id: string, updateObservationInput: UpdateObservationInput): Promise<Observation> {
    const update = new Observation()
    update.id = updateObservationInput.id
    update.name = updateObservationInput.name
    update.description = updateObservationInput.description
    update.weather = updateObservationInput.weather
    // update.birds = updateObservationInput.bird
    update.birdId = updateObservationInput.birdId
    // update.location = updateObservationInput.location
    update.areaId = updateObservationInput.areaId
    update.active = updateObservationInput.active
    return this.observationRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.observationRepository.delete(new ObjectId(id));
  }
}
