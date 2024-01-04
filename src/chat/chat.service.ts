import { Injectable } from '@nestjs/common';
//Para manejar la data de manera global en el servidor

interface Client{
    id: string;
    name: string;
}

@Injectable()
export class ChatService {
    // Record dettachment
    // eslint-disable-next-line prettier/prettier
    private clients: Record<string, Client> = {};

    //methods
    onClientConnected(client: Client) {
        this.clients[client.id] = client;    
    }

    onclientDisconneced(id: string) {
        delete this.clients[id];
    }

    getClients() {
        return Object.values(this.clients); // [Client, Client, Client];
    }
}
