const Persons = (props) => {
return(
    <>
    {props.personsToShow.map(person =>
    <Person key={person.name} name={person.name} number={person.number}/>)}
    </>
)
}
const Person = (props)=>{
    return(
      <>
      <p key={props.name}>{props.name} {props.number} <button>delete</button> </p>
      </>
    )
  }

export default Persons