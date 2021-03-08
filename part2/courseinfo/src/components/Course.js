import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({course}) => (
    <>
        <Header courseName={course.name}/>
        <Content courseParts={course.parts}/>
    </>
)

export default Course