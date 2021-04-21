import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({courses}) => (
    <>
        {courses.map((course) => (
            <div key={course.id}>
                <Header courseName={course.name}/>
                <Content courseParts={course.parts}/>
                <Total courseParts={course.parts}/>
            </div>
        ))}
    </>
)

export default Course