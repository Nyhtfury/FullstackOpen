import React from 'react'

const Persons = ({filteredPersons}) => (
    <ul>
        {
            filteredPersons.map(person => (
                <li key={person.name}>
                    {person.name} {person.number}
                </li>
            ))
        }
    </ul>
)

export default Persons