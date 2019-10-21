import React from 'react';



const Header = (props) => {
    
    return <h2>{props.course.name}</h2>
}

const Part = (props) => {
    return(
        
            <p>
            {props.part} {props.num}
            </p>
        
    )
}

const Content = (props) => {
    
    const rows = () => props.course.parts.map(part =>
        <Part
        key={part.id}
        part={part.name} 
        num={part.exercises}
        />
      )
    return(
        <div>
        
            {rows()}
        
        </div>
    )
}

const Total = (props) => {
    const parts = props.course.parts
    console.log(parts)
    const total = parts.reduce( (s, p) => s + p.exercises, 0)
    console.log("total ",total) 
    
    return(
        <div>
            <p>
               <strong>Total of {total}  exercises</strong> 
            </p>
        </div>
    )
    
}
const Course = (props) => {
    return(
        <div>
         
        <Header course={props.course} />
        <Content course={props.course}/>  
        <Total course={props.course} />
        </div>  
        )
}

export default Course