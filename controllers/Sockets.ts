import { Socket } from "@c/Socket.ts";

interface Result {
  type: 'name' | 'result',
  name: string,
  score?: number
}
export class Sockets {
  constructor(private sockets: Socket[] = []) {}

  public broadcast = (message: string) => {
    this.sockets.forEach((socket) => {
      socket.socket.send(message);
    });
  }

  public onConnected = (socket: WebSocket): void => {
    const newSocket = new Socket(socket);
    newSocket.onOpen();
    this.sockets = [...this.sockets, newSocket];
  }


  public onClosed = (): void => {
    this.sockets.filter((socket) => {
      socket.socket.readyState !== WebSocket.CLOSED;
    })
  }

  public onMessage = (e: MessageEvent<string>): void => {
    const message = JSON.parse(e.data);
    this.broadcast(JSON.stringify(message));
  }
}
