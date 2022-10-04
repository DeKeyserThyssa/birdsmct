import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Area } from 'src/areas/entities/area.entity'
import { Bird } from 'src/birds/entities/bird.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
export class Observation {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: string

  @Field() // GraphQL
  @Column() //typeORM
  name: string

  @Field() 
  @Column() 
  userId: string

  @Field({nullable: true}) 
  @Column({nullable: true}) 
  weather: string

  @Field(() => Bird)
  bird: Bird

  @Column()
  birdId: string

  @Field(() => Area)
  area: Area

  @Column()
  areaId: string

  @Field({nullable: true})
  @Column()
  active?: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
