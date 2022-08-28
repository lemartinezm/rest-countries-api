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

  useEffect(() => {
    async function fetchAllCountries () {
      await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch(alert);
    }

    async function fetchByRegion () {
      await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json();
        })
        .then(setCountries)
        .catch(alert);
    }

    if (region) fetchByRegion();
    else fetchAllCountries();
  }, [region]);

  return { countries, setRegion };
}
