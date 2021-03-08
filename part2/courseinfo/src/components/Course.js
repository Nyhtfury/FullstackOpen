import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => (
    <>
        <Header courseName={course.name}/>
        <Content courseParts={course.parts}/>
        <Total courseParts={course.parts}/>
    </>
)

export default Course