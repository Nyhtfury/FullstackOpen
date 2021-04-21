import React from 'react'

const Filter = ({ filterValue, handleFilter }) => (
    <div>
        <label>filter shown with</label>
        <input value={filterValue} onChange={handleFilter}/>
    </div>
)

export default Filter