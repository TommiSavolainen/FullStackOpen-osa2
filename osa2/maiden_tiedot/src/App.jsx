import { useState, useEffect } from 'react'
import noteService from './services/countries/countries'
import ShowCountries from './components/ShowCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {

    const maat = countries.map(country => country.name.common)
    setResults(maat.filter(maa => maa.toLowerCase().includes(event.target.value.toLowerCase())))
    if (event.target.value == ''){
      setResults([])
    }
  }
  // console.log(countries.map(country => country.name.common))
  return (
    <>
      <div>
        <label htmlFor="haku">find countries </label>
        <input onChange={filterCountries} />
        <ShowCountries results={results} countries={countries} setResults={setResults}></ShowCountries>
      </div>
    </>
  )
}

export default App
