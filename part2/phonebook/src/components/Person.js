const Person = ({ persons, handleDelete }) => {
	return (
    <>
      {!persons.length ? (
        <p>No matches found.</p>
      ) : (
        persons.map((person) => (
          <li key={person.id}>
            <span>{person.name}</span> <span>{person.number}</span>{" "}
            <button value={person.id} onClick={handleDelete}> delete</button>
          </li>
        ))
      )}
    </>
  );
}

export default Person;