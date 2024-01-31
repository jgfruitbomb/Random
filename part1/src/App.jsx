import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = (props) => {
  // save clicks of each button to its own state
  const { notes } = props;

  console.log(notes);

  return (
    <>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
