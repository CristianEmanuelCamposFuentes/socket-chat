import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

import { ChatService } from './chat.service';

// Inyeccion del servicio y definicion del gateway
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  // eslint-disable-next-line prettier/prettier
  public server: Server;

  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    // Necesito acceso al servidor de Websocket, escuchar conexiones nuevas
    this.server.on('connection', (socket: Socket) => {
      
      const {name, token} = socket.handshake.auth;
      console.log(name, token);

      if(!name) {
        socket.disconnect();
        return;
      }

      // Agregar cliente al listado
      this.chatService.onClientConnected({id: socket.id, name: name});

      // Mensaje de bienvenida
      socket.emit('welcome-message', `Bienvenid@ ${name} al servidor!`);

      // Listado de clientes conectados
      this.server.emit('on-clients-changed', this.chatService.getClients());

      socket.on('disconnect', () => {
        this.chatService.onclientDisconneced(socket.id);
          // console.log('Cliente desconectado', socket.id);
      });
    });
  }
}
