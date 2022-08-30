import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Grid, Input, InputGroup, InputLeftElement, Select, Spinner } from '@chakra-ui/react';
import { BaseSyntheticEvent, useState } from 'react';
import { CardCountry } from '../components/CardCountry';
import { Pagination } from '../components/Pagination';
import { REGIONS, useAllCountries } from '../hooks/useAllCountries';

export function Home () {
  const { countries, setRegion, setName, isFetching } = useAllCountries();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [timeoutId, setTimeoutId] = useState<number>();

  function handleSearch (e: BaseSyntheticEvent) {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => {
      setName(e.target.value);
    }, 500));
  }

  return (
    <Flex
      as='main'
      flexDir='column'
      grow={1}
      gap={8}
      px={{ base: '16px', md: '40px', lg: '80px' }}
      py={6}
    >

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify={{ base: 'inherit', md: 'space-between' }}
        gap={{ base: '32px', md: 'none' }}
      >
        <InputGroup
          position='relative'
          background='backgroundWhite'
          shadow='sm'
          maxW='500px'
        >
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>

          <Input
            onChange={handleSearch}
            border='hidden'
            placeholder='Search for a country...'
          />

        </InputGroup>

        <Select
          background='backgroundWhite'
          placeholder='Filter by Region'
          shadow='sm'
          w='200px'
          border='hidden'
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value={REGIONS.AFRICA}>Africa</option>
          <option value={REGIONS.AMERICA}>Americas</option>
          <option value={REGIONS.ASIA}>Asia</option>
          <option value={REGIONS.EUROPE}>Europe</option>
          <option value={REGIONS.OCEANIA}>Oceania</option>
        </Select>
      </Flex>

      {
        countries
          ? <>
            <Grid
              gap='32px'
              templateColumns={{
                base: '1fr',
                md: '1fr 1fr',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              }}
            >
              {
                countries.slice((currentPage - 1) * 10, currentPage * 10).map((country, index) => (
                  <CardCountry country={country} key={index} />
                ))
              }
            </Grid>

            <Pagination
              meta={{
                currentPage,
                totalDocuments: countries.length,
                totalPages: Math.ceil(countries.length / 10)
              }}
              onUpdatePagination={(toPage) => setCurrentPage(toPage)}
            />
          </>
          : isFetching
            ? <Flex flexGrow={1} justify='center' align='center' ><Spinner /></Flex>
            : <>Nothing to show</>
      }

    </Flex>
  );
}
