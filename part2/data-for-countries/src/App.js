import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filteredCountries, setFilteredCountries ] = useState(countries)
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all') // unfortunate that we cannot use the filter endpoint
            .then(response => {
                setCountries(response.data)
                setFilteredCountries(response.data)
            })
    },[]) // for those less familiar, [] makes it so useEffect only gets called once.

    const handleFilter = (event) => {
        let tempFilter = event.target.value
        setFilter(tempFilter)
        setFilteredCountries(countries.filter(country => applyFilter(country, tempFilter.toLowerCase())))
    }

    const applyFilter = (country, filterArg = filter) => country.name.toLowerCase().includes(filterArg)

  return (
    <>
        <Filter handleFilter={handleFilter} filterValue={filter}/>
        <Countries countries={filteredCountries}/>
    </>
  );
}

export default App;
