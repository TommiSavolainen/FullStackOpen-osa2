const Persons = (props) => {
return(
    <>
    {props.personsToShow.map(person =>
    <Person key={person.name} name={person.name} number={person.number} id={person.id} klikattiinDelete={props.klikattiinDelete} />)}
    </>
)
}
const Person = (props)=>{
    return(
      <>
      <p key={props.name}>{props.name} {props.number} <button onClick={()=> props.klikattiinDelete(props.name, props.id)}>delete</button> </p>
      </>
    )
  }

export default Persons