import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(`${__dirname}/build`));

// handle all requests not listed above this line by returnig react app
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', (socket: Socket) => {

});

server.listen(3001, () => {
	console.log('Listening on port 3001!');
});