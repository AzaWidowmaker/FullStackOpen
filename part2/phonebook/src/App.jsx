import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/personService'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(retrievedPersons => setPersons(retrievedPersons))
  }, [])

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  function handleOnChangeName(event) {
    setNewName(event.target.value)
  }

  function handleOnChangeNumber(event) {
    setNewNumber(event.target.value)
  }

  function handleOnChangeFilter(event) {
    setFilter(event.target.value)
  }
  
  function addPerson(event) {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if(!existingPerson) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))

          setNotification(`${addedPerson.name} was added successfully.`)
          setTimeout(() => {
            setNotification(null)
          }, 2500)

          setNewName('')
          setNewNumber('')
        })
    }
    else {
      if(window.confirm(`Do you want to update the phone number of ${newName}?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(p => p.name === newName ? updatedPerson : p))

            setNotification(`${existingPerson.name}'s phone number was updated.`)
            setTimeout(() => {
              setNotification(null)
            }, 2500)

            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setError(`${existingPerson.name} was already deleted.`)
            setTimeout(() => {
              setError(null)
            }, 2500)
          })
      }
    }
  }

  function deletePerson(id) {
    const person = persons.find(person => person.id === id);

    if (person) {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id));
                    
                    setNotification(`${person.name} was deleted from phonebook.`)
                    setTimeout(() => {
                      setNotification(null)
                    }, 2500)
                })
                .catch(error => {
                    alert(`Error: Could not delete ${person.name}. It may have already been removed from the server.`);
                });
        }
    }
  }

  return (
    <div>
      <Notification message={notification}/>
      <Error message={error} />
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleOnChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} onChangeName={handleOnChangeName} onChangeNumber={handleOnChangeNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={deletePerson}/>
    </div>
  )
}

export default App