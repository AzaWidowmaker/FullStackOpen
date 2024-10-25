import React from "react";

const Header = (props) => {
    return (
      <h1>{props.name}</h1>
    )
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => (
            <Part key={part.id} part={part} />
        ))}
      </div>
    )
}

const Total = ({parts}) => {
    let total = parts.reduce((acc, part) => acc += part.exercises, 0)
    return (
      <p><b>total of {total} exercises.</b></p>
    )
  }

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course