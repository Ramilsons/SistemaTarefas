
const express = require('express')
const router = express.Router()
var path = require('path');
//usando o model criado em Task.js
const mongoose = require("mongoose")
require("../models/Task")
const Tarefa = mongoose.model("tarefasRegistradas")

router.get('/', (req, res) => {

    Tarefa.find().sort({data: 'desc'}).lean().then((tarefas)=>{
        //tratando o formato do prazo
        tarefas.forEach(function(element, index){
            let format = new Date(tarefas[index].prazo)
            let d = format.getDate()+1
            let m = format.getMonth()+1
            let a = format.getFullYear() 
            tarefas[index].prazo = `${d}/${m}/${a}`
        })
        res.render('tasks', {tarefas: tarefas})
    }).catch((err) => { 
        console.log('houve um erro na consulta das tarefas' +err)
    }) 
})
router.post('/novaTask', (req, res) => {
    const novaTask = {
        nome: req.body.nome,
        prazo: req.body.prazo,
        dificuldade: req.body.dificuldade
    }
    //registrando uma nova tarefa
    new Tarefa(novaTask).save().then(() => {
        console.log('tarefa registrada com sucesso')
    }).catch((err) => {
        console.log('erro ao registrar tarefa' +err)
    })

    res.redirect('/')
})
router.get('/remove/:id', (req, res)=>{
    Tarefa.findOneAndRemove({ _id: req.params.id}).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log('houve um erro ao tentar apaggar a tarefa' +err)
    })
})
module.exports = router