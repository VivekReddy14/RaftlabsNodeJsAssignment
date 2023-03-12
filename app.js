const express = require('express');
const router = require('./routes/index')
const WebSocket = require("ws");
const jsonwebtoken = require("jsonwebtoken");
const db = require('./models/index');

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

// Express server 

const app = express();
const port = 8000;

app.use(express.json());

(async () => {
  await db.sequelize.sync();
})();
  
app.get('/',(req,res)=>{
    res.send('Hello world')
})

// Login API which gives JWT token

app.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const resp = await require('./controller/loginController')( email, password, JWT_SECRET, jsonwebtoken);
    res.send(resp)
  } catch(e){
    res.status(400).send(e.message)
  }
});

app.use('/',router)

app.listen(port, () => {
  console.log(`Your core service is running at http://localhost:${port}`);
});

// Web server implementation

const wsServer = new WebSocket.Server({
  noServer: true
})           
wsServer.on("connection", (ws) => {   
  ws.on("message", (msg) => {        
      wsServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {    
            client.send(msg.toString());
          }
      })
  })
})

app.on('upgrade', async function upgrade(request, socket, head) {      

 
  if(Math.random() > 0.5){
      return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii")     
  }
  
  wsServer.handleUpgrade(request, socket, head, function done(ws) {
    wsServer.emit('connection', ws, request);
  });
});