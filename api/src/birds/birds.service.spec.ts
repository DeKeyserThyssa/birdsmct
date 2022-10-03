import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { createBird, createBirdInputStub } from './stubs/birds.stub'
import { ObjectId } from 'mongodb'

describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdsRepository: Repository<Bird>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsService,
        {
          provide: getRepositoryToken(Bird),
          useValue: {
            save: jest.fn().mockResolvedValue(createBird()), //als je dit niet zegt en je runt een test dan zegt hij 'save is not a function', mockResolvedValue(nieuwe bird meegeven)
            find: jest.fn().mockResolvedValue([createBird()]),
            findOne: jest.fn().mockResolvedValue(createBird()),
            update: jest.fn().mockResolvedValue(createBird()),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdsRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create is called', () => {
      it('should call birdRepository.save', async () => {
        const newBird = new Bird()
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')

        await service.create(newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should call birdRepository.save with the correct params', async () => {
        const newBird = createBirdInputStub() //function that creates a new bird object
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')

        await service.create(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the created bird', async () => {
        const newBird = createBirdInputStub()
        const toReturnedBird = createBird()

        const result = await service.create(newBird)
        expect(result).toEqual(toReturnedBird)
      })
    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockBirdsRepository, 'find')
        await service.findAll()
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should return the list of birds', async () => {
        const toReturnedBirds = [createBird()]
        const result = await service.findAll()
        expect(result).toEqual(toReturnedBirds)
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      it('should call the repository findOne method', async () => {
        const findOneSpy = jest.spyOn(mockBirdsRepository, 'findOne')
        await service.findOne('8cb8791bdee8')
        expect(findOneSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const findOneSpy = jest.spyOn(mockBirdsRepository, 'findOne')
        await service.findOne('8cb8791bdee8')
        expect(findOneSpy).toBeCalledWith(new ObjectId('8cb8791bdee8'))
      })

      it('should return the bird', async () => {
        const toReturnedBird = createBird()
        const result = await service.findOne('8cb8791bdee8')
        expect(result).toEqual(toReturnedBird)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      it('should call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')
        const newBird = createBird()
        await service.update(newBird.id, newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')
        const newBird = createBird()
        await service.update(newBird.id, newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the updated bird', async () => {
        const toReturnedBird = createBird()
        const newBird = createBird()
        const result = await service.update(newBird.id, newBird)
        expect(result).toEqual(toReturnedBird)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      it('should call the repository delete method', async () => {
        const deleteSpy = jest.spyOn(mockBirdsRepository, 'delete')
        const newBird = createBird()
        await service.remove(newBird.id)
        expect(deleteSpy).toBeCalledTimes(1)
      })
    })
  })
})
