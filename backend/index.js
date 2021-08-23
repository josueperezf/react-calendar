const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')

require('dotenv').config();

const app = express();


// base de datos
dbConnection();

// cors
app.use(cors());

// directorio publico
app.use(express.static('public'));

// lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/eventos', require('./routes/eventos'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port port! ${process.env.PORT}`));