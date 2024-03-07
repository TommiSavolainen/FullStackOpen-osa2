
// const Course = (props) => {
//   return(
//   <>
//   <Header course={props.course} />
//   <Content course={props.course} />
//   </>
//   )
// }

// const Header = (props) => {
//   return(
//   <>
//   <h2>{props.course.name}</h2>
//   </>
//   )
// }

// const Content = (props) => {
//   return(
//     <>
//     <Part parts={props.course.parts}/>
//     </>
//   )
// }

// const Part = (props) => {
//   return(
//     <>
//     {props.parts.map(part =>(<p key={part.id}>{part.name} {part.exercises}</p>))}
//     <p><b>total of {props.parts.reduce((total, item) => total + item.exercises,0)} exercises</b></p>
//     </>
// )
// }
import Course from './components/Course'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>(<Course key={course.id} course={course}/>))}
    </div>
  )
}

export default App