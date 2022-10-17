import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Polygon } from 'geojson'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Observation } from 'src/observations/entities/observation.entity'
import { Surface } from './surface.area'
@Entity()
@ObjectType({ description: 'area' })
export class Area {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: ObjectId

  @Field() // GraphQL
  @Column() //typeORM
  name: string

  // @Field()
  // @Column()
  // observationsId: string

  @Field(() => [Observation], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  observations: Observation[]

  @Field(() => Surface)
  @Column({ nullable: true, type: 'simple-json' })
  surface: Polygon // area is beter, maar wordt al gebruikt

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
