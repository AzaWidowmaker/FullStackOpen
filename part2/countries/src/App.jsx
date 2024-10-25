import { useState, useEffect } from 'react'
import axios from 'axios'
import react from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

const api_key = "691e949ec294a6e5f85c2981143e9b77"
const base_url = "http://api.openweathermap.org/data/2.5/weather?"

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let newCountries = response.data.map(country => ({
          'id': country.cca2,
          'name': country.name.common,
          'capital': country.capital?.[0],
          'area': country.area,
          'languages': Object.values(country.languages ?? []),
          'flag': country.flag
        }))
        setCountries(newCountries)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))


  function handleOnChange(event) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleOnChange={handleOnChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}


export default App