const { WebSocketServer, WebSocket } = require('ws');

let socketServer;

function peerProxy(httpServer) {
  // Create a websocket object
  socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

function broadcast(data, excludeSocket) {
  if (!socketServer) return;

  socketServer.clients.forEach((client) => {
    if (client !== excludeSocket && client.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      client.send(message);
    }
  });
}

module.exports = { peerProxy, broadcast};
