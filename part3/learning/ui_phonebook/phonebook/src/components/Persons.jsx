const Persons = (props) => {
  return (
    <>
      {props.persons
        .filter((person) =>
          person.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map((person, index) => {
          return (
            <p key={person.key || index}>
              {person.name} - {person.number}
            </p>
          );
        })}
    </>
  );
};

export default Persons;
