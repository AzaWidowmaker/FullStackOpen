import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = "691e949ec294a6e5f85c2981143e9b77"
const base_url = "http://api.openweathermap.org/data/2.5/weather?"

const Countries = ({countries: countries}) => {

    if(countries.length > 10) {
        return (
            <div>
                <h2>Countries: </h2>
                <p>Too many countries. Change your filter.</p>
            </div>
        )
    }
    if(countries.length === 0) {
        return (
            <div>
                <h2>Countries: </h2>
                <p>No countries to show.</p>
            </div>
        )
    }
    else if(countries.length === 1) {

        let country = countries[0]
        const [weather, setWeather] = useState({})
        const url = base_url + "appid=" + api_key + "&q=" + country.name + "&units=metric"

        useEffect(() => {
            axios
                .get(url)
                .then(response => {
                    let newWeather = ({
                        temp: response.data.main.temp,
                        wind: response.data.wind.speed * 3.6,
                        icon: response.data.weather[0].icon
                    })
                    setWeather(newWeather)
                })
        }, [])

        const icon_url = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
        return (
            <div>
                <h2>Countries: </h2>
                <h3>{country.name}</h3>
                Capital: {country.capital} <br />
                Area: {country.area} km² <br />

                <h3>Languages: </h3>
                <ul>
                    {country.languages.map(lang => (
                        <li key={lang}>
                            {lang}
                        </li>
                    ))}
                </ul>
                <span style={{ fontSize: '250px' }}>{country.flag}</span>
                <h3>Weather: </h3>
                Temperature: {weather.temp} °C <br/>
                Winds: {weather.wind} km/h <br/>
                <img src={icon_url} alt='Weather icon' />

            </div>
        )
    }

    return (
        <div>
            <h2>Countries: </h2>
            {countries.map(country => (
                <div key={country.id}>
                    {country.name}
                </div>
            ))}
        </div>
    )
}

export default Countries