import React from 'react'

const Persons = ({filteredPersons, onClickDelete}) => (
    <ul>
        {
            filteredPersons.map(person => (
                <li key={person.name}>
                    {person.name} {person.number} <button onClick={() => onClickDelete(person.id)}>delete</button>
                </li>
            ))
        }
    </ul>
)

export default Persons