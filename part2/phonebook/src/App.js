import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons"

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ filteredPersons, setFilteredPersons ] = useState(persons)
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setFilteredPersons(initialPersons)
            })
    },[])

    const applyFilter = (person, filterArg = filter) => {
        return Object.values(person)
            .map(el => el.toString().toLowerCase().includes(filterArg))
            .includes(true)
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        /* I think React schedules all state updates to happen after the completion of the handler
           therefore, use this temp value when filtering persons list (or suffer weird "indexing" errors) */
        let tempFilter = event.target.value
        setFilter(tempFilter)
        setFilteredPersons(persons.filter(person => applyFilter(person, tempFilter.toLowerCase())))
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
            let result = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
            if (result === true) {
                personService
                    .getPersonId(newPerson.name)
                    .then(id => personService.update(id, newPerson))
                    .catch(response => {
                        console.log(response);
                        console.log(`Failed to update ${newPerson.name}'s number.`);
                    })
                    .then(response => {
                        const tempPersons = persons.map(person => {
                            person.number = person.name === newPerson.name ? newPerson.number : person.number;
                            return person;
                        });
                        updatePersonsState(tempPersons);
                        console.log(`Updated UI with ${newPerson.name}'s updated info.`)
                    })
                    .catch(response => {
                        console.log(response);
                        console.log(`Failed to update UI with ${newPerson.name}'s updated info.`);
                    })

            }
        } else {
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    const tempPersons = persons.concat(returnedPerson);
                    updatePersonsState(tempPersons);
                    console.log(`Successfully added ${newPerson.name} to 'backend'.`);
                })
                .catch(response => {
                    console.log(response);
                    console.log(`Failed to add ${newPerson.name} to 'backend'.`);
                })
        }
    }

    const removePerson = (id) => {
        const tempPerson = persons.find(p => p.id === id);
        if (window.confirm(`Delete ${tempPerson.name}?`)) {
            personService
                .remove(id)
                .then(response => {
                    const tempPersons = persons.filter(p => p.id !== id);
                    updatePersonsState(tempPersons);
                    console.log(`Successfully removed ${tempPerson.name} from 'backend'.`);
                })
                .catch(response => {
                    console.log(response);
                    console.log(`Failed to remove ${tempPerson.name} from 'backend'.`)
                })
        }
    }

    const updatePersonsState = (tempPersons) => {
        setPersons(tempPersons);
        setFilteredPersons(tempPersons.filter(person => applyFilter(person)));
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter filterValue={filter} handleFilter={handleFilter}/>
            <h2>add a new</h2>
            <PersonForm newName={newName}
                        handleNewName={handleNewName}
                        newNumber={newNumber}
                        handleNewNumber={handleNewNumber}
                        addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} onClickDelete={removePerson}/>
        </div>
    )
}

export default App