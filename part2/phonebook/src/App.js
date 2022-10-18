import { useState, useEffect } from "react";
import nameService from "./services/names";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    nameService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const filteredContent = persons.filter((person) => {
    return (
      person.name.toLowerCase().startsWith(searchField.toLowerCase()) ||
      person.number.startsWith(parseInt(searchField))
    );
  });

  const handleDelete = (event) => {
    const id = parseInt(event.target.value);
    const item = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${item.name}`)) {
      nameService
        .deleteObject(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        });
    }
  };

  return (
    <div>
      <PersonForm persons={persons} setPersons={setPersons} handleSearch={handleSearch} />
      <ul>
        <Person persons={filteredContent} handleDelete={handleDelete} />
      </ul>
    </div>
  );
};

export default App;
