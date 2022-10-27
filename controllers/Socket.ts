interface Connection {
  type: 'connection',
  message: string;
}

export class Socket {
  socket: WebSocket;
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
  public onOpen = () => {
    const sendData: Connection = {
      type: 'connection',
      message: 'connection successfully!'
    }
    this.socket.send(JSON.stringify(sendData));
  }
}
