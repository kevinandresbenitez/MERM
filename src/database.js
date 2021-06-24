const mongose = require('mongoose');


mongose.connect('mongodb://localhost/tasks-merm', { useNewUrlParser: true ,useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
    console.log('Iniciando base de datos');
}).catch(()=>{
    console.log('Error al iniciar base de datos');
})

module.exports = mongose;