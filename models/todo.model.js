const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        default:'',
        required:true
    },
    category:{
        type:String,
        default:'',
        required:true
    },
    date:{
        type:Date,
        default:'',
    }
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo