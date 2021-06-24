const express = require('express');
const Router = express.Router();


const Tasks = require('../models/task');
Router.use(express.json());

Router.get('/',async(req,res)=>{
    let Tareas =await Tasks.find()
    .then((Tareas)=>{res.json(Tareas)})
    .catch(()=>{res.json({status:404})})
})

Router.get('/:id',async(req,res)=>{
    let Tareas =await Tasks.findById(req.params.id)
    .then((Tareas)=>{res.json(Tareas)})
    .catch(()=>{res.json({status:404})})
})

Router.post('/',async(req,res)=>{
    await Tasks.create(req.body)
        .then((Tareas)=>{res.json({status:202})})
        .catch(()=>{res.json({status:404})})
})

Router.put('/:id',async(req,res)=>{
    await Tasks.findByIdAndUpdate(req.params.id,req.body)
        .then(()=>{res.json({status:202})})
        .catch(()=>{res.json({status:404})})

})

Router.delete('/:id',async(req,res)=>{
    await Tasks.findByIdAndDelete(req.params.id)
        .then(()=>{res.json({status:202})})
        .catch(()=>{res.json({status:404})})


})

module.exports = Router