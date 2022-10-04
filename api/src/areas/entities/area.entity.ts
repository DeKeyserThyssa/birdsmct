import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Bird } from 'src/birds/entities/bird.entity'
import { Observation } from 'src/observations/entities/observation.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'area' })
export class Area {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: string

  @Field() // GraphQL
  @Column() //typeORM
  name: string

  @Field(() => Bird)
  bird: Bird

  @Column()
  birdId: string

  @Field(() => [Observation])
  @Column({nullable: true})
  observations: Observation[]

  @Field() // GraphQL
  @Column() //typeORM
  area: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}