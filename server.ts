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
let gameRestarted = false;

class Lobby {
	// the host socket
	private _owner: Socket;
	private _name: string;

	constructor(owner: Socket) {
		this._owner = owner;
		this._name = `Room:${owner.id}`;
	}

	get id(): string {
		return this._owner.id;
	}

	get name(): string {
		return this._name;
	}

	join(guest: Socket) {
		guest.join(this._name);
	}
}

const lobbies: { [index: string]: Lobby } = {};

app.use(express.static(`${__dirname}/build`));

// app.get('/:guestId', (req, res) => {
// 	console.log(req.params);
	
// });

// handle all requests not listed above this line by returnig react app
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', (socket: Socket) => {
	console.log(`Socket with id: ${socket.id} connected.`);
	
	const host = socket.handshake.query.host !== '' ? socket.handshake.query.host : socket.id;
	console.log(host);
	
	// typeguard
	if (typeof host !== 'string') return;

	// TODO: if lobby is undefined!!!
	
	if (socket.handshake.query.host === '') {
		// create new lobby
		lobbies[socket.id] = new Lobby(socket);
		io.to(socket.id).emit('initiator', socket.id);

		//test
		socket.join(lobbies[socket.id].name);

	} else if (typeof socket.handshake.query.host === 'string') {
		// join lobby
		//lobbies[socket.handshake.query.host].join(socket);
		//socket.join(socket.handshake.query.host);
		socket.join(lobbies[host].name);
		io.to(socket.id).emit('initiator', socket.handshake.query.host);
	}
	

	console.log(socket.rooms)
	

	// take note of the first socket
	// if (initiator === '') {
	// 	initiator = socket.id;
	// }

	
	socket.on('disconnect', (reason) => {
		console.log(reason);

		if (initiator === socket.id) {
			initiator = '';
		}

		io.to(lobbies[host].name).emit('server_disconnected', reason);
	});

	socket.on('cell_update', (data) => {
		console.table(data);
		console.log(lobbies[host].id, host);
		
		
		socket.to(lobbies[host].name).emit('cell_update', data);
	});

	socket.on('winner', (data: {player: string, result: number[]}) => {
		socket.to(lobbies[host].name).emit('winner', data);
	});

	socket.on('draw', (lastIndex: number) => {
		socket.to(lobbies[host].name).emit('draw', lastIndex);
	});

	// TODO: move to lobby
	socket.on('restart', () => {

		if (!gameRestarted) {
			gameRestarted = true;
			socket.broadcast.emit('restart');
		} else {
			gameRestarted = false;
		}
		
	});
});

server.listen(3001, () => {
	console.log('Listening on port 3001!');
});