import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons"
import "./index.css"

const App = () => {
    const [ persons, setPersons ] = useState([]);
    const [ filteredPersons, setFilteredPersons ] = useState(persons);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');
    const [ error, setError ] = useState(false);
    const [ statusMessage, setStatusMessage ] = useState('');
    const [ timeoutReference, setTimeoutReference ] = useState(0);

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
                setFilteredPersons(initialPersons);
            })
    },[])

    const setTimeoutStatus = (isError, message, timeout = 2500) => {
        try {
            clearTimeout(timeoutReference);
        } catch (e) {
            console.log(e);
        }

        setError(isError)
        setStatusMessage(message);
        setTimeoutReference(setTimeout(() => {
            setStatusMessage(null);
        }, timeout));
    }

    const applyFilter = (person, filterArg = filter) => {
        return Object.values(person)
            .map(el => el.toString().toLowerCase().includes(filterArg))
            .includes(true);
    }

    const handleNewName = (event) => {
        setNewName(event.target.value);
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilter = (event) => {
        /* I think React schedules all state updates to happen after the completion of the handler
           therefore, use this temp value when filtering persons list (or suffer weird "indexing" errors) */
        let tempFilter = event.target.value;
        setFilter(tempFilter);
        setFilteredPersons(persons.filter(person => applyFilter(person, tempFilter.toLowerCase())));
    }

    const addPerson = (event) => {
        event.preventDefault();

        if (!newName) {
            setTimeoutStatus(true, "Please enter a name before proceeding.");
            return;
        } else if (!newNumber) {
            setTimeoutStatus(true, "Please enter a number before proceeding.");
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        };

        let duplicate = false;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newPerson.name) {
                duplicate = true;
                break;
            }
        }

        if (duplicate) {
            let result = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`);
            if (result === true) {
                personService
                    .getPersonId(newPerson.name)
                    .then(id => personService.update(id, newPerson))
                    .catch(response => {
                        console.log(response);
                        setTimeoutStatus(true, `Failed to update ${newPerson.name}'s number.`);
                    })
                    .then(response => {
                        const tempPersons = persons.map(person => {
                            person.number = person.name === newPerson.name ? newPerson.number : person.number;
                            return person;
                        });
                        updatePersonsState(tempPersons);
                        setTimeoutStatus(false, `Updated ${newPerson.name}'s info.`)
                    })
                    .catch(response => {
                        console.log(response);
                        setTimeoutStatus(true, `Failed to update ${newPerson.name}'s info.`)
                    });
            }
        } else {
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    const tempPersons = persons.concat(returnedPerson);
                    updatePersonsState(tempPersons);
                    setTimeoutStatus(false, `Successfully added ${newPerson.name} to 'backend'.`);
                })
                .catch(response => {
                    console.log(response);
                    setTimeoutStatus(true, `Failed to add ${newPerson.name} to 'backend'.`);
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
                    setTimeoutStatus(false, `Successfully removed ${tempPerson.name} from 'backend'.`);
                })
                .catch(response => {
                    console.log(response);
                    setTimeoutStatus(true, `Failed to remove ${tempPerson.name} from 'backend'.`)
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
            <Notification message={statusMessage} isError={error}/>
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