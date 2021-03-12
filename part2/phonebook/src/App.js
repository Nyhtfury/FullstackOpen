import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ filteredPersons, setFilteredPersons ] = useState(persons)
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        // I think React schedules all state updates to happen after the completion of the handler
        // therefore, use this temp value when filtering persons list (or suffer weird "indexing" errors)
        let tempFilter = event.target.value.toLowerCase()
        setFilter(tempFilter)
        setFilteredPersons(persons.filter(person => Object.values(person)
            .map(el => el.toLowerCase().includes(tempFilter))
            .includes(true)))
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (!newName) {
            alert("Please enter a name before proceeding.")
            return;
        } else if (!newNumber) {
            alert("Please enter a number before proceeding.")
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        let duplicate = false;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newPerson.name) {
                duplicate = true;
                break;
            }
        }

        if (duplicate) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
                <div>
                    <label>filter shown with</label>
                    <input value={filter} onChange={handleFilter}/>
                </div>
            <h2>add a new</h2>
            <form>
                <div>
                    <label>name:</label>
                    <input value={newName} onChange={handleNewName}/>
                </div>
                <div>
                    <label>number:</label>
                    <input value={newNumber} onChange={handleNewNumber}/>
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {filteredPersons.map(person => (
                        <li key={person.name}>
                            {person.name} {person.number}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default App