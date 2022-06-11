// main server.js file

// imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require("./models/Todo")

/* PORT used */ 
const PORT = 3001

const app = express()
app.use(express.json())
app.use(cors())

/* Database connect with mongoose */ 
mongoose.connect("mongodb://127.0.0.1:27017/emi-todo", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB" ))
    .catch(console.error)


/* == ENDPOINTS == */ 

/* GET /todos 
* == get all todos == */ 
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    // return json with all todos 
    res.json(todos)
})

/* POST /todo/new 
* == post new todo == */ 
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save()
    // returns new todo
    res.json(todo)
})


/* DELETE /todo/delete/:id
 * == delete todo by id == */ 
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    // returns deleted item
    res.json(result)
})


/* PUT /todo/complete/:id
 * == change state of todo with :id to other binary state (complete/not)== */ 
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.complete = !todo.complete

    todo.save()
    /* return our changed todo */ 
    res.json(todo)
})


/* PORT declared globally */ 
app.listen(PORT, 
    () => console.log(`Todo server started on port: ${PORT}`))


