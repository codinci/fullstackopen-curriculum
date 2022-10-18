import Weather from "./Weather";

function Country({ country }) {
  return (
    <>
      <h2>{country.name.common}</h2>
      {country.hasOwnProperty("capital") ? (
        <p>Capital {country.capital[0]}</p>
      ) : (
        <p>
          Capital <em>No details</em>
        </p>
      )}

      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.name.common + "flag"}
        width="100px"
      />

      {country.hasOwnProperty("capital") ? (
        <Weather capital={country.capital[0]}/>
      ) : (
        <p>Cannot display weather information.</p>
      )}
    </>
  );
}

export default Country;
