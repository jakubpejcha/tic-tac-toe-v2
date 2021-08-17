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

io.on('connection', (socket: Socket) => {
    console.log(`Socket with id: ${socket.id} connected.`);

    // Never accept an array
    if (
        Array.isArray(socket.handshake.query.host) ||
        typeof socket.handshake.query.host === 'undefined'
    ) {
        return;
    }

    // TODO: if lobby is undefined!!!
    let host: string;

    if (socket.handshake.query.host === '') {
        host = socket.id;
        // create new lobby
        lobbies[host] = new Lobby(socket);
        io.to(host).emit('initiator', host);

        //test
        socket.join(lobbies[host].name);
    } else {
        host = socket.handshake.query.host;
        // join lobby
        //lobbies[socket.handshake.query.host].join(socket);
        //socket.join(socket.handshake.query.host);
        socket.join(lobbies[host].name);
        io.to(socket.id).emit('initiator', host);
    }

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

    socket.on('winner', (data: { player: string; result: number[] }) => {
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
