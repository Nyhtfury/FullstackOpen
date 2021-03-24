import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({country}) => {
    const [ weather, setWeather ] = useState({})

    const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    },[country.name])

    if (weather.current) {
        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital ?? "Unknown Capital"}</div>
                <div>population {country.population.toString() ?? "Unknown Population"}</div>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt={`Flag of ${country.name}`} style={{width: "100px", height: "auto"}}/>
                <h2>Weather in {country.capital}</h2>
                <div>
                    <strong>temperature:</strong> {weather.current.temperature} Celsius
                </div>
                <div>
                    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} style={{width: "75px", height: "auto"}}/>
                </div>
                <div>
                    <strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital ?? "Unknown Capital"}</div>
                <div>population {country.population.toString() ?? "Unknown Population"}</div>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt={`Flag of ${country.name}`} style={{width: "100px", height: "auto"}}/>
            </>
        )
    }
}

export default CountryDetail