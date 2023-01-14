const express = require('express');
const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

require('dotenv').config();

require('express-async-errors');

const app = express();

app.use(express.json());

app.use(cors);

app.use(routes);

app.use(errorHandler);

app.listen(3001, () => console.log('Server started att "http//localhost:3001'));
