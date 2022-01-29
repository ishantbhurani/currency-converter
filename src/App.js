import { useEffect, useState, useRef } from "react";

const CURRENCY_RATES_URL = "https://api.frankfurter.app/latest?from=USD";
const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rates, setRates] = useState({});

  const fetchCurrencyRates = async () => {
    setLoading(true);
    try {
      let response = await fetch(CURRENCY_RATES_URL);
      if (!response.ok)
        throw new Error(`An error has occured: ${response.status}`);

      const { rates } = await response.json();
      rates.USD = 1;

      setRates(rates);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error);
      setRates({});
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  if (loading)
    return (
      <div className="container">
        <h1 className="title">Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <h1>Oops... Something went wrong! </h1>
      </div>
    );

  return (
    <div className="container">
      <h1 className="title">Currency converter</h1>
      <div className="card">
        <section className="exchange-rate">
          <p className="exchange-rate-title">Exchange rate</p>
          <h2 className="exchange-rate-amount">$27.77</h2>
        </section>
      </div>
    </div>
  );
}

export default App;
