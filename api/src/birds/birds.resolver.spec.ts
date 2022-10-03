import { Test, TestingModule } from '@nestjs/testing'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { createBird, createBirdInputStub } from './stubs/birds.stub'
import { ObjectId } from 'mongodb'
import { MessageTypes } from '../bootstrap/entities/ClientMessage'

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
            remove: jest.fn().mockResolvedValue( {affected: 1}),
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
      });

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      });
    });
  })

  describe('findAll', () => {
    let resultBirds: Bird[]
    beforeEach(async () => {
      resultBirds = await resolver.findAll()
    })

    describe('When findAll is called', () => {
      it('should call the service findAll method', async () => {
        expect(service.findAll).toBeCalledTimes(1)
      });

      it('should return the created bird', async () => {
        expect(resultBirds).toEqual([createBird()])
      });
    })
  })

  describe('findOne', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.findOne(createBird().id)
    })

    describe('When findOne is called', () => {
      it('should call the service findOne method', async () => {
        expect(service.findOne).toBeCalledTimes(1)
      });

      it('should call birdsService.findOne with the correct params', async () => {
        expect(service.findOne).toBeCalledWith(createBird().id)
      })

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      });
    })
  })

  describe('updateBird', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.updateBird(createBird())
    })

    describe('When updateBird is called', () => {
      it('should call the service update method', async () => {
        expect(service.update).toBeCalledTimes(1)
      });

      it('should call birdsService.update with the correct params', async () => {
        expect(service.update).toBeCalledWith(createBird().id, createBird())
      })

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      });
    })
  })

  describe('removeBird', () => {
    let res: any
    beforeEach(async () => {
      res = await resolver.removeBird(createBird().id)
    })

    describe('When removeBird is called', () => {
      it('should call the service remove method', async () => {
        expect(service.remove).toBeCalledTimes(1)
      });

      it('should call birdsService.remove with the correct params', async () => {
        expect(service.remove).toBeCalledWith(new ObjectId (createBird().id))
      })

      it('should return the correct message', async () => {
        jest
          .spyOn(service, 'remove')
          .mockResolvedValue({affected: 1, raw: ''})

        res = await resolver.removeBird(createBird().id)
        expect(res).toEqual({
          type: MessageTypes.succes,
          message: 'Bird deleted',
          statusCode: 200,
        })
      });

      // it('should return the correct error message', async () => {
      //   jest
      //     .spyOn(service, 'remove')
      //     .mockResolvedValue({affected: 5, raw: ''})

      //   res = await resolver.removeBird(createBird().id)
      //   expect(res).toEqual({
      //     type: MessageTypes.error,
      //     message: 'Delete action went very wrong',
      //     statusCode: 400,
      //   })
      // });
    })
  })
})
