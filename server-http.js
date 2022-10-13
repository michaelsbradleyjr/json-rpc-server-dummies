const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { JSONRPCServer } = require('json-rpc-2.0');

const server = new JSONRPCServer();
server.addMethod('echo', ([text]) => text);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  try {
    const jsonRPCRequest = req.body;
    const jsonRPCResponse = await server.receive(jsonRPCRequest);
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(8090);
