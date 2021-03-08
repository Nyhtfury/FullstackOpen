import React from 'react'

const Total = ({ courseParts }) => (
    <p>
        <strong>total of {courseParts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
    </p>
)

export default Total