const { request, response } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get("/info", (request, response) => {
  const date = new Date()
  const entries = persons.length
  response.send(`<p>Phonebook has info for ${entries} people</p><p>${date}</p>`)
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  const newID = Math.floor(Math.random() * 5000)

  {
    /* virheen käsittelyt. tarkistetaan nimi, numero ja uniikki nimi*/
  }
  if (!body.name) {
    return response.status(400).json({ error: "name missing" })
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" })
  }
  if (
    persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return response.status(400).json({ error: "name must be unique" })
  }

  const person = {
    id: newID,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
