import { useState } from "react";
import nameService from "../services/names";
import Notification from "./Notification";
import Search from "./Search";

const PersonForm = ({ persons, setPersons, handleSearch }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [status, setStatus] = useState(null);

  console.log(newName);

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const name = persons.find((person) => person.name === newName);
        const id = name.id;
        const updatedContact = { ...name, number: newNumber };

        nameService
          .update(id, updatedContact)
          .then((returnedPhonebook) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPhonebook
              )
            );
            setStatus({
              type: "success",
              message: `Updated ${newName}`,
            });
            setTimeout(() => {
              setStatus(null);
            }, 5000);
          })
          .catch((error) => {
            setStatus({
              type: "error",
              message: `Information of ${newName} has already been removed from server`,
            });
            setTimeout(() => {
              setStatus(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== id));
          });
      }
    } else {
      nameService
        .create(nameObject)
        .then((returnedNames) => {
          setPersons(persons.concat(returnedNames));
          setStatus({ type: "success", message: `Added ${newName}` });
          setTimeout(() => {
            setStatus(null);
          }, 5000);
        })
    }
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    const userNameInput = event.target.value;
    setNewName(userNameInput);
  };

  const handleNumberChange = (event) => {
    const userNumberInput = event.target.value;
    setNewNumber(userNumberInput);
  };

  return (
    <>
      <Notification status={status} />
      <Search handleSearch={handleSearch} />
      <h2>Add new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>
            name:
            <input value={newName} onChange={handleNameChange} />
          </p>
          <p>
            number:
            <input value={newNumber} onChange={handleNumberChange} />
          </p>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
