const { JSONRPCServer } = require('json-rpc-2.0');
const { WebSocketServer } = require('ws');

const server = new JSONRPCServer();
server.addMethod('echo', ([text]) => text);

const wss = new WebSocketServer({ port: 8090 });

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    try {
      const jsonRPCRequest = JSON.parse(data);
      const jsonRPCResponse = await server.receive(jsonRPCRequest);
      if (jsonRPCResponse) {
        ws.send(JSON.stringify(jsonRPCResponse));
      }
    } catch (error) {
      console.error(error);
    }
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });
});

wss.on('close', () => {
  console.log('Server closed');
});
