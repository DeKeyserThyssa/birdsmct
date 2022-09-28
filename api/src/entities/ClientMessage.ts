import { Field, ObjectType } from "@nestjs/graphql";

export enum MessageTypes {
    succes = 'Success',
    error = 'error',
    warning = 'warning'
}

@ObjectType()
export class ClientMessage {
    @Field()
    type: string // TODO: make strict enum

    @Field()
    message: string
    
    @Field()
    statusCode: number
}