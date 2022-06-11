const mongoose = require("mongoose")
const Schema = mongoose.Schema

/* Decide the structure of your database */ 
const TodoSchema = new Schema({
  text: {
    type: String, 
    required: true 
  }, 
  complete: {
    type: Boolean, 
    default: false 
  }, 
  timestamp: {
    type: String, 
    default: Date.now()
  }, 
})


const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo 


