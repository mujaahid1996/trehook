const express = require('express');
const app = express();
var mPort = process.env.PORT || 8829;
// process.env.PORT

app.get('/', (req, res) => res.send('Hello World! '
	+'listening on port '
	+ mPort))

app.listen( mPort, () => console.log(
	'listening on port '
	+ mPort
	+ ' !'))
// app.listen(8829, () => console.log('listening on port 8829!'))