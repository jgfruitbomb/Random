import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personAPI from "./services/persons";
import './App.css'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [status, setStatus] = useState();

  useEffect(() => {
    personAPI.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Build new temp object
    const tempPerson = {
      name: newName,
      number: newNumber,
      id: (Math.random() * 100).toString()
    };

    // Check if exist
    if (persons.some((person) => person.name === newName)) {
      if (!window.confirm("Do you want to update the user number"))
      {
       return;
      } else {
      // User wants to update the existing number
      const matchedIndex = persons.map(person => person.name).indexOf(newName)
      personAPI.update(persons[matchedIndex].id, tempPerson)
        .catch (error => {
          setNotificationMessage(`Error updating ${newName} user is no longer there`);
          setStatus("error");

          setTimeout( () => {
            setNotificationMessage(null)
            setStatus("")
          }, 1000)
          
          return;
        })
      
      const newPerson = persons.map(p => {
        if (p.name === newName) {
            return {...p, number: newNumber}
        }
        return p;
      }
    )
      
      setPersons(newPerson)
      }
    } else {
    // Add to array
    setPersons(persons.concat(tempPerson));

    // Add to database
    personAPI.create(tempPerson);

    setNotificationMessage(`Added ${newName}`)
    setStatus("good")
    setTimeout( () => {
      setNotificationMessage(null)
      setStatus("")
    }, 1000)
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    if(!window.confirm("You sure you want to delete this?"))
      return;

    personAPI.remove(id);
    
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div className = {`notification-${status}`}>
      <Notification message={notificationMessage}/>
      </div>
      <Filter handleFilter={handleFilter} />
      <h1>add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
