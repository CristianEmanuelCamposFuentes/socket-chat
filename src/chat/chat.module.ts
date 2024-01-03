import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
// Agrupador de tod o lo que esta adentro del chat
@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
