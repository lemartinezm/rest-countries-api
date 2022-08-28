import { useEffect, useState } from 'react';

export function useCountry (name: string) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchData () {
      await fetch(`https://restcountries.com/v3.1/name/${name}}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountry)
        .catch((err) => alert(err));
    }
    fetchData();
  });

  return country;
}
