

const Course = (props) => {
    return(
    <>
    <Header course={props.course} />
    <Content course={props.course} />
    </>
    )
}

const Header = (props) => {
    return(
    <>
    <h2>{props.course.name}</h2>
    </>
    )
}

const Content = (props) => {
return(
    <>
    <Part parts={props.course.parts}/>
    </>
)
}

const Part = (props) => {
return(
    <>
    {props.parts.map(part =>(<p key={part.id}>{part.name} {part.exercises}</p>))}
    <p><b>total of {props.parts.reduce((total, item) => total + item.exercises,0)} exercises</b></p>
    </>
)
}

export default Course