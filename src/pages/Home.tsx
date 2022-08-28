import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { CardCountry } from '../components/CardCountry';
import { Pagination } from '../components/Pagination';
import { useAllCountries } from '../hooks/useAllCountries';

export function Home () {
  const { countries } = useAllCountries();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Flex
      as='main'
      flexDir='column'
      gap={8}
      px={4}
      py={6}
    >

      <InputGroup
        background='backgroundWhite'
        shadow='sm'
      >
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>

        <Input border='hidden' placeholder='Search for a country...' />
      </InputGroup>

      <Select
        background='backgroundWhite'
        placeholder='Filter by Region'
        shadow='sm'
        w='200px'
        border='hidden'
      >
        <option value='africa'>Africa</option>
        <option value='america'>America</option>
        <option value='asia'>Asia</option>
        <option value='europe'>Europe</option>
        <option value='oceania'>Oceania</option>
      </Select>

      {
        countries
          ? <>
            {
              countries.slice((currentPage - 1) * 10, currentPage * 10).map((country, index) => (
                <CardCountry country={country} key={index} />
              ))
            }
            <Pagination
              meta={{
                currentPage,
                totalDocuments: countries.length,
                totalPages: Math.ceil(countries.length / 10)
              }}
              onUpdatePagination={(toPage) => setCurrentPage(toPage)}
            />
          </>
          : <Spinner />
      }

    </Flex>
  );
}
