import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

import { ChatService } from './chat.service';

// Inyeccion del servicio y definicion del gateway
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    // Necesito acceso al servidor de Websocket, escuchar conexiones nuevas
    this.server.on('connection', (socket: Socket) => {
      console.log('Cliente conectado ', socket.id);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
      });
    });
  }
}
