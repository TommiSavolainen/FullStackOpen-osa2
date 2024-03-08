import { useState } from 'react'

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

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }
    if (persons.findIndex(person => person.name === noteObject.name)===-1){
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }else {
      alert(`${newName} is already added to phonebook`)
    }
    }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filter = newFilter
    if (filter === ''){
      setShowAll(true)
    }else{
      setShowAll(false)
    }
  }

  const Person = (props)=>{
    return(
      <>
      <p key={props.name}>{props.name} {props.number}</p>
      </>
    )
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )

}

export default App