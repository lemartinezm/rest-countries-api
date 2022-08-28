import { useEffect, useState } from 'react';

export enum REGIONS {
  AFRICA = 'africa',
  AMERICA = 'americas',
  ASIA = 'asia',
  EUROPE = 'europe',
  OCEANIA = 'oceania'
}

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
  const [region, setRegion] = useState<REGIONS | string>();
  const [name, setName] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAllCountries () {
      setCountries(undefined);
      setIsFetching(true);
      await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch(alert)
        .finally(() => setIsFetching(false));
    }

    async function fetchByRegion () {
      setCountries(undefined);
      setIsFetching(true);
      await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch(alert)
        .finally(() => setIsFetching(false));
    }

    async function fetchByName () {
      setCountries(undefined);
      setIsFetching(true);
      await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,population,region,capital,flags`)
        .then(async (res) => {
          if (res.status === 404) throw new Error('No results found!');
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch(() => {
          setCountries(undefined);
        })
        .finally(() => setIsFetching(false));
    }
    if (name) fetchByName();
    else if (region) fetchByRegion();
    else fetchAllCountries();
  }, [region, name]);

  return { countries, setRegion, setName, isFetching };
}
