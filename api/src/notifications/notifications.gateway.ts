import { WsException } from '@nestjs/websockets'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { SubscribeMessage } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AreasService } from 'src/areas/areas.service'
import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidationPipe'

@WebSocketGateway(3004)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly areasService: AreasService,
  ) {}

  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients: number = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    // throw new WsException('Method not implemented.')
    return 'Hello world!'
  }

  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleBirdspotterMoving(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log('🐦')
    console.log(data)
    const liveLoc = await this.livelocationsService.create(data)
    return Promise.resolve(liveLoc)
  }

  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.')
    this.numberOfClients--
    this.server.emit('user:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }

  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleNewLocation(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log(data)
    const liveLoc = await this.livelocationsService.create(data)
    //check if in a known area/location
    const l = await this.areasService.findAreaByPoint(liveLoc.geolocation)

    if (l.length > 0) {
      console.log('in a known area/location')
      console.log(l[0].name)
      console.log(`Rooms of client:`, client.rooms)
      client.join(l[0].name)
      console.log(`Rooms of client:`, client.rooms)
      // this.server.emit('birdspotter:newlocation', liveLoc)
      this.server.to(l[0].name).emit('birdspotter:newlocation', liveLoc)
    } else {
      console.log('not in a known area/location')
    }

    // this.server.emit('birdspotter:newlocation', data) //send to all clients including the one that sent the message
    //client.broadcast.emit('birdspotter:newlocation', data) //to all but the sender
    return Promise.resolve(liveLoc)
  }
}
