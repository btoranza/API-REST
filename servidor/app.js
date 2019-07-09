const express = require('express');
const cors = require('cors');

const app = express();
app.use( cors() );
app.use( express.json() );

const apiRouter = require('./routes/api');
app.use( "/api", apiRouter );

app.listen(3000)



