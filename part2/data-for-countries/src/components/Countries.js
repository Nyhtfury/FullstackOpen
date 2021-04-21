import React from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({countries, showButtonClick}) => {
    switch (countries.length) {
        case 0:
            return (
                <div>
                    No matches for the given filter.
                </div>
            )
        case 1:
            return (
                <CountryDetail country={countries[0]}/>
            )
        default:
            if (countries.length > 10) {
                return (
                    <div>
                        Too many matches (>10), specify another filter.
                    </div>
                )
            } else {
                return (
                    <>
                        {countries.map(country =>
                            <div key={country.name}>
                                {country.name} <button onClick={() => showButtonClick(country.name)}>show</button>
                            </div>
                        )}
                    </>
                )
            }
    }
}

export default Countries