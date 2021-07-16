import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/build`))

// handle all requests not listed above
// becouse of reactRouter
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

app.listen(3001, () => {
	console.log('Listening on port 3001!');
})