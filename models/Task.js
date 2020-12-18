const mongoose = require("mongoose")

// Model - Tasks
    //definindo o model
    const TarefaSchema = new mongoose.Schema({
        nome: { type: String, require: true},
        data: { type: Date, default: Date.now()},
        prazo: { type: Date },
        dificuldade: { type: String, require: true },
    })

    mongoose.model('tarefasRegistradas', TarefaSchema)