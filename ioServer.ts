import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

// globals
let initiator = '';
let gameRestarted = false;

class Lobby {
    // the host socket
    private _hostSocket: Socket;
    private _id: string;
    private _name: string;

    private _maxPlayers = 2;
    private _numPlayers = 0;

    constructor(hostSocket: Socket) {
        this._hostSocket = hostSocket;
        this._id = hostSocket.id;
        this._name = `Room:${hostSocket.id}`;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    private _updateNumOfPlayers() {
        this._numPlayers++;
    }

    init() {
        this.join(this._hostSocket);
    }

    join(guest: Socket) {
        if (this._numPlayers >= this._maxPlayers) {
            // no more room in lobby
            throw new Error('Lobby already full!');
        }

        guest.join(this._name);
        this._updateNumOfPlayers();
    }
}

const lobbies: { [index: string]: Lobby } = {};

io.on('connection', (socket: Socket) => {
    console.log(`Socket with id: ${socket.id} connected.`);

    const host = socket.handshake.query.host;

    // Do not accept an array
    if (Array.isArray(host) || typeof host === 'undefined') {
        console.log(host);
        return;
    }

    let hostId: string;

    if (host === '') {
        hostId = socket.id;
        // create new lobby
        lobbies[hostId] = new Lobby(socket);
        lobbies[hostId].init();

        io.to(hostId).emit('initiator', hostId);
    } else {
        console.log('host-non-empty:', host);
        hostId = host;

        // join lobby
        try {
            console.log('hostId:', hostId);

            lobbies[hostId].join(socket);
            io.to(socket.id).emit('initiator', hostId);
            io.to(hostId).emit('restart');
        } catch (error) {
            console.log(error.message);
        }
    }

    socket.on('disconnect', (reason) => {
        console.log(reason);

        if (initiator === socket.id) {
            initiator = '';
        }

        if (lobbies[hostId]) {
            io.to(lobbies[hostId].name).emit('server_disconnected', reason);
            delete lobbies[hostId];
        } else {
            io.to(socket.id).emit('server_disconnected', reason);
        }
    });

    socket.on('cell_update', (data) => {
        socket.to(lobbies[hostId].name).emit('cell_update', data);
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
