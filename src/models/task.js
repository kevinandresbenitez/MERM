const mongose = require('mongoose');


const taskSchema = mongose.Schema({
    name : {
        require:true,
        type:String
    },
    description :{
        require:true,
        type:String
    }

})


module.exports = mongose.model('Task',taskSchema);
