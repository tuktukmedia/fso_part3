const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.jsfymdr.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('lisää myös salasana')
  process.exit(1)
}

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('phonebook:')

      Person.find({}).then((result) => {
        result.forEach((person) => console.log(person.name, person.number))

        return mongoose.connection.close()
      })
    })
    .catch((error) => console.log(error))
}

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      const person = new Person({
        name: name,
        number: number,
      })

      return person.save()
    })
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((error) => console.log(error))
}
