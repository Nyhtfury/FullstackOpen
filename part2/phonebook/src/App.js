import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
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
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNewName}/>
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => (
                    <li key={person.name}>
                        {person.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App