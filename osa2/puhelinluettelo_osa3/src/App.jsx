import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import noteService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('Anna nimi...')
  const [newNumber, setNewNumber] = useState('Anna puhelinnumero...')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [Message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const klikattiinDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)){
      noteService
        .deletePerson(id)
      const filterList = persons.filter(person => person.id != id)
      setPersons(filterList)
      setMessage(
        `Deleted ${name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }


  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }
    if (persons.findIndex(person => person.name === noteObject.name)===-1){
      noteService
        .create(noteObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(
            error.response.data
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const findId = persons.find((person) => {
          if (person.name == newName){
            return person.id
          }
        })
        noteService
          .update(findId.id, noteObject)
          .then(response => {
            const newList = persons.filter(person => person.number !== findId.number)
            newList.push(noteObject)
            setPersons(newList)
            setNewName('')
            setNewNumber('')
            setMessage(
              `Changed ${newName} phone number`
              )
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
            .catch(error => {
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setPersons(persons.filter(person => person.id !== findId.id))
              setNewName('')
              setNewNumber('')
            })
      }
      
    }
    }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
    if (filter === ''){
      setShowAll(true)
    }else{
      setShowAll(false)
    }
  }



  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} klikattiinDelete={klikattiinDelete} />
    </div>
  )

}

export default App