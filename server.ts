import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

// globals
let initiator = '';

app.use(express.static(`${__dirname}/build`));

// handle all requests not listed above this line by returnig react app
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', (socket: Socket) => {
	console.log(`Socket with id: ${socket.id} connected.`);

	// take note of the first socket
	if (initiator === '') {
		initiator = socket.id;
	}

	socket.emit('initiator', initiator);

	// socket.on('disconnecting', (reason) => {
	// 	console.log(reason);
	// 	console.log(socket.id);

	// 	if (initiator === socket.id) {
	// 		initiator = '';
	// 	}
	// })

	socket.on('disconnect', (reason) => {
		console.log(reason);
		console.log(socket.id);

		if (initiator === socket.id) {
			initiator = '';
		}

		io.emit('server_disconnected', reason);
	});

	socket.on('cell_update', (data) => {
		console.table(data);
		
		socket.broadcast.emit('cell_update', data);
	});

	socket.on('winner', (data: {player: string, result: number[]}) => {
		socket.broadcast.emit('winner', data);
	})
});

server.listen(3001, () => {
	console.log('Listening on port 3001!');
});