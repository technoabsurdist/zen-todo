// main server.js file

// imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const QA = require("./models/QA")

/* PORT used */ 
const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())

/* Database connect with mongoose */ 
mongoose.connect("mongodb://127.0.0.1:27017/flashy", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB" ))
    .catch(console.error)


/* == ENDPOINTS == */ 

/* GET /questions 
* == get all questions == */ 
app.get('/questions', async (req, res) => {
    const questions = await QA.find()
    // return json with all questions 
    res.json(questions)
})

/* POST /question/new 
* == post new question == */ 
app.post('/question/new', (req, res) => {
    const question = new QA({
        text: req.body.text
    })

    question.save()
    // returns new question
    res.json(question)
})


/* DELETE /question/delete/:id
 * == delete question by id == */ 
app.delete('/question/delete/:id', async (req, res) => {
    const result = await QA.findByIdAndDelete(req.params.id)
    // returns deleted item
    res.json(result)
})


/* PUT /question/complete/:id
 * == change state of question with :id to other binary state (complete/not)== */ 
app.get('/question/edit/:id', async (req, res) => {
    const question = await QA.findById(req.params.id)
    question.complete = !todo.complete
    question.save()
    /* return our changed question */ 
    res.json(question)
})


/* PORT declared globally */ 
app.listen(PORT, 
    () => console.log(`QA server started on port: ${PORT}`))


