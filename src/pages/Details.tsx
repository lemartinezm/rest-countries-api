import { Button, Flex, Grid, GridItem, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailedCountry } from '../hooks/useDetailedCountry';

export function Details () {
  const { name } = useParams();
  const { country, isFetching, borderCountries } = useDetailedCountry(name);
  const navigate = useNavigate();

  return (
    <Flex
      flexDir='column'
    >
      <Button onClick={() => navigate('/')}>
        Back
      </Button>
      {
        country
          ? <>
            <Image src={country.flags.png} />

            <Heading>{country.name.common}</Heading>

            <Text>
              <Text as='span'>Native Name: </Text> {Object.values<any>(country.name.nativeName)[0].official}
            </Text>

            <Text>
              <Text as='span'>Population: </Text> {country.population}
            </Text>

            <Text>
              <Text as='span'>Region: </Text> {country.region}
            </Text>

            <Text>
              <Text as='span'>Sub Region: </Text> {country.subregion}
            </Text>

            <Text>
              <Text as='span'>Capital: </Text> {country.capital[0]}
            </Text>

            <Text>
              <Text as='span'>Top Level Domain: </Text> {country.tld[0]}
            </Text>

            <Text>
              <Text as='span'>Currencies: </Text> {Object.values<any>(country.currencies).map(value => value.name).join(', ')}
            </Text>

            <Text>
              <Text as='span'>Languages: </Text> {Object.values<any>(country.languages).join(', ')}
            </Text>

            <Heading>Border Countries:</Heading>
            <Grid templateColumns='repeat(3, 1fr)' gap='16px'>
              {
                borderCountries.length > 0
                  ? borderCountries.map((borderCountry, index) => (
                    <GridItem w='100%' key={`border-country-${index}`} justifySelf='center' >
                      <Button w='100%' onClick={() => navigate(`/${borderCountry.toLocaleLowerCase()}`)}>
                        {borderCountry}
                      </Button>
                    </GridItem>
                  ))
                  : <>No border countries</>
              }
            </Grid>
          </>
          : isFetching
            ? <><Spinner /></>
            : <>Not found</>
      }
    </Flex>
  );
}
