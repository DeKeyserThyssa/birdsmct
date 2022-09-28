import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';
import { Area } from './entities/area.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>
  ) {}


  create(createAreaInput: CreateAreaInput): Promise<Area> {
    const a = new Area()
    a.name = createAreaInput.name
    return this.areaRepository.save(a);
  }

  findAll(): Promise<Area[]>  {
    return this.areaRepository.find();
  }

  findOne(id: string) {
    return this.areaRepository.findOne(new ObjectId(id))
  }

  update(id: string, updateBirdInput: UpdateAreaInput): Promise<Area> {
    const update = new Area()
    update.id = new ObjectId(updateBirdInput.id)
    update.name = updateBirdInput.name
    return this.areaRepository.save(update) // save gives us an advantage
  }

  remove(id: string) {
    return this.areaRepository.delete(new ObjectId(id));
  }
}
