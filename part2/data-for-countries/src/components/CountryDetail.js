import React from 'react'

const CountryDetail = ({country}) => (
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

export default CountryDetail