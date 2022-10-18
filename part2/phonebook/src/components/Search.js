const Search = ({ handleSearch, status }) => {
	return (
    <>
      Search: <input onChange={handleSearch} />
    </>
  );
}

export default Search;