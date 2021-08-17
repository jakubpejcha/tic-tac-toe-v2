import express from 'express';
import { server as ioServer } from './ioServer';

const app = express();

app.use(express.static(`${__dirname}/build`));

// handle all requests not listed above this line by returnig react app
app.get('*', (_, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

// setup ports
app.listen(3001, () => {
    console.log('Listening on port 3001!');
});

ioServer.listen(3002, () => {
    console.log('Listening on port 3002!');
});
