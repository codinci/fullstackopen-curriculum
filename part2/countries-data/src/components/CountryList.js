import Country from "./Country";

function CountryList({ filteredCountry, handleCountrySelect }) {
  return (
    <div>
      {filteredCountry.length <= 10 ? (
        filteredCountry.length === 1 ? (
          filteredCountry.map((country, index) => (
            <Country key={index} country={country} />
          ))
        ) : (
          <ul>
            {filteredCountry.map((country, index) => (
              <li key={index}>
                {country.name.common}{" "}
                <button value={country.name.common} onClick={handleCountrySelect}>Show</button>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Too many matches, specify another filter.</p>
      )}
    </div>
  );
}

export default CountryList;
