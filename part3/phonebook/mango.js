const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstack.huq8f.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack`

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema)

if(process.argv.length === 3) {
    mongoose
        .connect(url)
        .then(() => {
            console.log("Connected")
            console.log("phonebook:")
            return Person.find({})
        })
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name}: ${person.number}`)
            })
            mongoose.connection.close()
        })
        .catch(error => console.log(error))
}

if(process.argv.length >= 5) {
    mongoose
        .connect(url)
        .then(() => {
            console.log("Connected")

            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            return person.save()
        })
        .then((result) => {
            console.log(`added ${result.name} number ${result.number} to phonebook.`)
            mongoose.connection.close()
        })
        .catch(error => console.log(error))
}



