import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Bird } from '../birds/entities/bird.entity'
import { Repository } from 'typeorm'
import * as jsonBirdsSeed from './data/scraped-birds.json' //tsconfig "resolveJsonModule": true,
import { plainToInstance } from 'class-transformer' //https://www.npmjs.com/package/class-transformer
import { Polygon } from 'geojson'
import { Area } from 'src/areas/entities/area.entity'
import { Observation } from 'src/observations/entities/observation.entity'

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Bird)
    private birdsRepository: Repository<Bird>,
    @InjectRepository(Area)
    private areasRepository: Repository<Area>,
    @InjectRepository(Observation)
    private observationsRepository: Repository<Observation>,
  ) {}

  async addAllBirds(): Promise<Bird[]> {
    let theBirds: Bird[] = [];
    //@ts-ignore
    for (let jsonb of jsonBirdsSeed) {
      //let b = plainToInstance(Bird, jsonb);
      const b = new Bird();
      b.name = jsonb.name;
      b.fullname = jsonb.fullname;
      b.category = jsonb.category;
      b.observations = 0;
      b.url = jsonb.url;
      b.description = jsonb.description;

      theBirds.push(b);
    }

    return this.birdsRepository.save(theBirds);
  }

  async addAllLocations(): Promise<Area[]> {
    const areas: Area[] = []

    // Kortrijk Weide
    const weidePoly: Polygon = {
      coordinates: [
        [
          [3.253174, 50.8233894],
          [3.2513479, 50.8248729],
          [3.2526568, 50.825754],
          [3.2520774, 50.8262826],
          [3.2500175, 50.8254287],
          [3.2485584, 50.8245341],
          [3.249009, 50.8240597],
          [3.2497815, 50.8235717],
          [3.2498458, 50.8231108],
          [3.2493094, 50.8227448],
          [3.2506612, 50.8216468],
          [3.253174, 50.8233894],
        ],
      ],
      type: 'Polygon',
    }

    const weide = new Area()
    weide.name = 'Kortrijk Weide'
    // weide.area = 'Kortrijk'
    weide.surface = weidePoly
    areas.push(weide)

    // Kortrijk The Square
    const squarePoly: Polygon = {
      coordinates: [
        [
          [3.3082043, 50.8231039],
          [3.3082036, 50.8231091],
          [3.3060264, 50.8243612],
          [3.3052915, 50.8250626],
          [3.3040523, 50.8249677],
          [3.3041435, 50.8242561],
          [3.3049428, 50.8238088],
          [3.3039343, 50.8232259],
          [3.3048999, 50.8217043],
          [3.3082043, 50.8231039],
        ],
      ],
      type: 'Polygon',
    }
    const square = new Area()
    square.name = 'Kortrijk The Square'
    // square.area = 'Kortrijk'
    square.surface = squarePoly
    areas.push(square)

    // De Blaarmeeresen in Gent
    const blaarmeeresenPoly: Polygon = {
      coordinates: [
        [
          [3.6752956, 51.0520678],
          [3.6751494, 51.0520036],
          [3.678411, 51.0476331],
          [3.6796985, 51.0427765],
          [3.6835608, 51.0370019],
          [3.6881957, 51.0369479],
          [3.6901698, 51.0392147],
          [3.6945472, 51.0426146],
          [3.7005553, 51.0446653],
          [3.7040744, 51.0459604],
          [3.6752956, 51.0520678],
        ],
      ],
      type: 'Polygon',
    }

    const blaarmeeresen = new Area()
    blaarmeeresen.name = 'De Blaarmeeresen in Gent'
    // blaarmeeresen.area = 'Gent'
    blaarmeeresen.surface = blaarmeeresenPoly
    areas.push(blaarmeeresen)

    return this.areasRepository.save(areas)
  }

  async addAllObservations(): Promise<Observation[]> {
    const observations: Observation[] = []
    const birds = await this.birdsRepository.find()
    const locations = await this.areasRepository.find()
    const spottedB = birds[0]
    spottedB.observations += 1
    await this.birdsRepository.save(spottedB)
    const { createdAt, updatedAt, ...embeddedBird } = spottedB

    const obs = new Observation()
    obs.name = 'manueel toegevoegd'
    obs.userId = 'abc123'
    obs.birdId = birds[0].id.toString()
    obs.areaId = locations[0].id.toString()
    obs.geolocation = {
      type: 'Point',
      coordinates: [3.2532747, 50.8233769],
    }

    obs.bird = embeddedBird //birds[0]
    obs.area = locations[0]

    observations.push(obs)
    return await this.observationsRepository.save(observations)
  }

  async deleteAllBirds(): Promise<void> {
    await this.birdsRepository.delete({})
    return Promise.resolve()
  }
}