require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))


app.get('/', (request, response) => {
  response.send("<h1>l7mar 3la khoh</h1>")
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    response.send(
      `Phonebook has info for ${count} people <br />
      ${new Date()}`
    )
  })

})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!(body.number && body.name)) {
    return response.status(400).json({
      error: "Name or number or both missing."
    })
  }

  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({
        error: `${body.name} already exists in the phonebook.`
      })
    } else {
      const newPerson = new Person({
        name: body.name,
        number: body.number
      })
      newPerson.save().then(addedPerson => response.json(addedPerson))
                      .catch(error => next(error))
    }
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then(person => {
      if (!person) {
        return response.status(404).json({ error: "Person not found" })
      }

      return Person.deleteOne({ _id: id })
    })
    .then(() => response.status(204).end())
    .catch(error => next(error))
})


app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})