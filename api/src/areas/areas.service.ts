import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateAreaInput } from './dto/create-area.input'
import { UpdateAreaInput } from './dto/update-area.input'
import { Area } from './entities/area.entity'
import { ObjectId } from 'mongodb'
import { Point } from 'geojson'
import { Observation } from 'src/observations/entities/observation.entity'

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  create(createAreaInput: CreateAreaInput): Promise<Area> {
    const a = new Area()
    a.name = createAreaInput.name
    // a.observationsId = createAreaInput.observationsId
    // a.area = createAreaInput.area
    a.surface = createAreaInput.surface
    return this.areaRepository.save(a)
  }

  findAll(): Promise<Area[]> {
    return this.areaRepository.find()
  }

  findOne(id: string): Promise<Area> {
    return this.areaRepository.findOne(new ObjectId(id))
  }

  findAreaByPoint(p: Point): Promise<Area[]> {
    return this.areaRepository.find({
      where: {
        surface: {
          //@ts-ignore
          $geoIntersects: {
            $geometry: p,
          },
        },
      },
    })
  }

  update(updateAreaInput: UpdateAreaInput) {
    const update = new Area()
    update.id = new ObjectId(updateAreaInput.id)
    update.name = updateAreaInput.name
    // update.observationsId = updateLocationInput.observationsId
    // update.area = updateAreaInput.area
    update.surface = updateAreaInput.surface
    return this.areaRepository.save(update) // save gives us an advantage
  }

  remove(id: string): Promise<DeleteResult> {
    return this.areaRepository.delete(new ObjectId(id))
  }

  async incrementLocation(id: string, observations: Observation[]) {
    const a: Area = await this.findOne(new ObjectId(id))

    a.observations = a.observations
      ? [...observations, ...a.observations] // merge the current observations with the new ones
      : [...observations]

    return this.areaRepository.save(a)
  }
}
