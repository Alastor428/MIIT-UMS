import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws'; // Use 'ws' instead of 'socket.io'
import { TeacherEventDto } from 'src/teacher/dto/teacher-event.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*', // Adjust for production
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    handleConnection(@ConnectedSocket() client: WebSocket) {
        console.log('Client connected:');
    }

    handleDisconnect(@ConnectedSocket() client: WebSocket) {
        console.log('Client disconnected');
    }

    @SubscribeMessage('joinBatch')
    handleJoinBatch(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() batch: string,
    ) {
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('newEvent')
    handleEvent(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() data: { batch: string; event: TeacherEventDto },
    ) {
        const { batch, event } = data;
        console.log(`Broadcasting event to batch ${batch}:`, event);
        // Broadcast to all clients (raw WebSockets don't have rooms)
        this.server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'newEvent', data: event }));
            }
        });
    }
}