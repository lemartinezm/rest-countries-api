import { useEffect, useState } from 'react';

export type CountryDetailSchema = {
  flags: {
    png: string,
    svg: string
  }
  name: {
    common: string,
    official: string,
    nativeName: object
  },
  tld: string[],
  currencies: object,
  capital: string[],
  region: string,
  subregion: string,
  languages: object,
  borders: string[],
  population: number
}

export function useDetailedCountry (name: string | undefined) {
  const [country, setCountry] = useState<CountryDetailSchema>();
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData () {
      setIsFetching(true);
      await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(country => setCountry(country[0]))
        .catch(console.log)
        .finally(() => setIsFetching(false));
    }

    if (name) fetchData();
  }, [name]);

  useEffect(() => {
    async function fetchBorderCountries (borderCountriesCodes: string[]) {
      setIsFetching(true);
      await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountriesCodes.join(',')}&fields=name`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wront!');
          return await res.json();
        })
        .then(countriesFound => {
          setBorderCountries(countriesFound.map((countryFound: any) => countryFound.name.common));
        })
        .catch(console.log)
        .finally(() => setIsFetching(false));
    }

    if (country && country.borders.length > 0) fetchBorderCountries(country.borders);
  }, [country]);

  return { country, borderCountries, isFetching };
}
