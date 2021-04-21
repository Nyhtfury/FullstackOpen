import React from 'react'

const Filter = ({ filterValue, handleFilter }) => (
    <div>
        <label>find countries</label>
        <input value={filterValue} onChange={handleFilter}/>
    </div>
)

export default Filter