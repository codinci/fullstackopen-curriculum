import axios from "axios";
import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
  };

  const filteredCountry = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .startsWith(searchCountry.toLowerCase());
  });

  const handleCountrySelect = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <label>
        Search for country <input type="text" onChange={handleSearch} />
      </label>
      <div>
        <CountryList
          filteredCountry={filteredCountry}
          handleCountrySelect={handleCountrySelect}
        />
      </div>
    </div>
  );
}

export default App;
