import { CreateBirdInput } from "../dto/create-bird.input";
import { Bird } from "../entities/bird.entity";
import { ObjectId } from "mongodb";

export const createBirdInputStub = (): CreateBirdInput => {
    const b = new CreateBirdInput()
    b.name = 'name'
    b.fullname = 'fullname'
    b.category = 'category'
    b.url = 'url'
    b.observations = 2
    b.description = 'description'
    return b
}

export const createBird = (): Bird => {
    const b = new Bird()
    b.id = new ObjectId('8cb8791bdee8')
    b.name = 'name'
    b.fullname = 'fullname'
    b.category = 'category'
    b.url = 'url'
    b.observations = 2
    b.description = 'description'
    return b
}