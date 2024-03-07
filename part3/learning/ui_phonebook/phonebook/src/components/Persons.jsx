const Persons = (props) => {
  return (
    <>
      {props.persons
        .filter((person) =>
          person.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} - {person.number}
            <button onClick={ () => props.handleDelete(person.id)}>Delete</button>
            </p>
            
          );
        })}
    </>
  );
};

export default Persons;
