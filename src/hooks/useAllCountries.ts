import { useEffect, useState } from 'react';

export type CountrySchema = {
  flags: {
    png: string,
    svg: string
  },
  name: {
    common: string,
    official: string,
    nativeName: any
  },
  capital: string[],
  region: string,
  population: number
};

export function useAllCountries () {
  const [countries, setCountries] = useState<CountrySchema[]>();

  useEffect(() => {
    async function fetchData () {
      await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch((err) => alert(err));
    }
    fetchData();
  });

  return { countries };
}
