const express = require('express');
const morgan = require('morgan');
const path= require('path');
const { env } = require('process');

const mongose =require('./database');

let aplicacion = express();

// Setings
aplicacion.set('port', process.env.PORT || 3031 )

// Midlewares
aplicacion.use(morgan('dev'));
aplicacion.use(express.json());

// Routes
aplicacion.use('/Api/tasks',require('./routes/tasks'));

// Static files
aplicacion.use(express.static(path.join(__dirname,'public')) );

// Starting the server
aplicacion.listen(aplicacion.get('port'),()=>{
    console.debug("Servidor iniciado en "+ aplicacion.get('port'));
})
