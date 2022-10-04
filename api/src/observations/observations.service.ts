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
    const o = new Observation()
    o.name = createObservationInput.name
    o.userId = createObservationInput.userId
    o.weather = createObservationInput.weather
    o.birdId = createObservationInput.birdId
    return this.observationRepository.save(o);
  }

  findAll(): Promise<Observation[]>  {
    return this.observationRepository.find();
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOne(new ObjectId(id));
  }

  update(id: string, updateObservationInput: UpdateObservationInput): Promise<Observation> {
    const update = new Observation()
    update.id = new ObjectId(updateObservationInput.id)
    update.name = updateObservationInput.name
    update.userId = updateObservationInput.userId
    update.weather = updateObservationInput.weather
    return this.observationRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.observationRepository.delete(new ObjectId(id));
  }
}
