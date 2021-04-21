import React from 'react'

const PersonForm = (props) => (
    <form>
        <div>
            <label>name:</label>
            <input value={props.newName} onChange={props.handleNewName}/>
        </div>
        <div>
            <label>number:</label>
            <input value={props.newNumber} onChange={props.handleNewNumber}/>
        </div>
        <div>
            <button type="submit" onClick={props.addPerson}>add</button>
        </div>
    </form>
)

export default PersonForm