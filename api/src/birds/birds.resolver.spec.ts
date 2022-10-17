import { Test, TestingModule } from '@nestjs/testing'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { createBird, createBirdInputStub } from './stubs/birds.stub'
import { ObjectId } from 'mongodb'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let service: BirdsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsResolver,
        //BirdsService
        {
          provide: BirdsService,
          useValue: {
            create: jest.fn().mockResolvedValue(createBird()),
            findAll: jest.fn().mockResolvedValue([createBird()]),
            findOne: jest.fn().mockResolvedValue(createBird()),
            update: jest.fn().mockResolvedValue(createBird()),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    service = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    let createBirdDTO: CreateBirdInput
    let resultBird: Bird

    beforeEach(async () => {
      createBirdDTO = createBirdInputStub()
      resultBird = await resolver.createBird(createBirdDTO)
    })

    describe('When createBird is called', () => {
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  describe('findAll', () => {
    let result: Bird[]
    beforeEach(async () => {
      result = await resolver.findAll()
    })

    describe('When findAll is called', () => {

      it('should call birdService.findAll()', () => {
        expect(service.findAll).toBeCalledTimes(1)
      })

      // REMARK: 2 manieren om arrays aan te duiden
      // Bird[]
      // [Bird]

      it('should return some (or one) bird(s)', () => {
        expect(result).toEqual([createBird()])
      })
    })
  })

  describe('findOne', () => {
    let result: Bird
    beforeEach(async () => {
      result = await resolver.findOne(createBird().id)
    })

    describe('check service findOne implementation', () => {
      it('should call birdService correct', () => {
        expect(service.findOne).toBeCalledTimes(1)
        expect(service.findOne).toBeCalledWith(createBird().id)
      })

      it('should return the created bird', () => {
        expect(result).toEqual(createBird())
      })
    })
  })

  describe('update', () => {
    let result: Bird
    beforeEach(async () => {
      result = await resolver.updateBird(createBird())
    })

    describe('check service update implementation', () => {
      it('should call the service update method', () => {
        expect(service.update).toBeCalledTimes(1)
        expect(service.update).toBeCalledWith(createBird())
      })

      it('should return the updated bird', () => {
        expect(result).toEqual(createBird())
      })
    })
  })

  describe('remove', () => {
    let result: ClientMessage
    beforeEach(async () => {
      result = await resolver.removeBird(createBird().id)
    })

    describe('Check the service implementation', () => {
      it('is the remove function called correctly', async () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(createBird().id)
      })

      describe('check the GraphQL return', () => {
        it('is the message clear to the frontend', async () => {
          const expectResult: ClientMessage = {
            type: MessageTypes.succes,
            message: 'Bird deleted', // Zelfde als in de resolver code
            statusCode: 200,
          }

          expect(result).toEqual(expectResult)
        })

        it('is the error message shown when something goes wrong', async () => {
          jest
            .spyOn(service, 'remove')
            .mockResolvedValue({ affected: 500, raw: '' })

          result = await resolver.removeBird(createBird().id)

          const expectResult: ClientMessage = {
            type: MessageTypes.error,
            message: 'Delete action went very long', // Zelfde als in de resolver code
            statusCode: 400,
          }

          expect(result).toEqual(expectResult)
        })
      })
    })
  })
})
