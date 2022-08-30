import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, GridItem, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailedCountry } from '../hooks/useDetailedCountry';

export function Details () {
  const { name } = useParams();
  const { country, isFetching, borderCountries } = useDetailedCountry(name);
  const navigate = useNavigate();

  return (
    <Flex
      as='main'
      flexDir='column'
      m={{ base: '32px', lg: '80px' }}
      gap={{ base: '32px', lg: '96px' }}
      flex={1}
      maxW={{ sm: '500px', md: '700px', lg: '900px', xl: '1280px' }}
      w={{ lg: '100%' }}
      alignSelf={{ base: 'center' }}
      boxSizing='content-box'
    >
      <Button
        px='16px'
        py='8px'
        rounded={6}
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        lineHeight='none'
        w='112px'
        shadow='md'
        background='backgroundWhite'
      >
        Back
      </Button>
      {
        country
          ? <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            gap={{ base: '32px', lg: '96px' }}
            alignSelf='center'
            w='100%'
          >
            <Image src={country.flags.png} objectFit='contain' w='600px' />

            <Flex alignSelf='center' flexDir='column' flex={1} gap='32px' w='100%'>

              <Heading fontSize='28px' >{country.name.common}</Heading>

              <Flex flexDir={{ base: 'column', md: 'row' }} gap='32px'>
                <Flex flexDir='column' gap='16px' flex={1}>
                  <Text>
                    <Text as='span' fontWeight={600}>Native Name: </Text>
                    {Object.values<any>(country.name.nativeName)[0].official}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Population: </Text>
                    {country.population.toLocaleString()}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Region: </Text>
                    {country.region}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Sub Region: </Text>
                    {country.subregion}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Capital: </Text>
                    {country.capital.join(', ')}
                  </Text>
                </Flex>

                <Flex flexDir='column' gap='16px' mt='8px' flex={1}>
                  <Text>
                    <Text as='span' fontWeight={600}>Top Level Domain: </Text>
                    {country.tld[0]}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Currencies: </Text>
                    {Object.values<any>(country.currencies).map(value => value.name).join(', ')}
                  </Text>

                  <Text>
                    <Text as='span' fontWeight={600}>Languages: </Text>
                    {Object.values<any>(country.languages).join(', ')}
                  </Text>
                </Flex>
              </Flex>

              <Flex flexDir={{ base: 'column', lg: 'row' }} gap='16px' mt='8px'>
                <Text fontWeight={600} fontSize='18px'>Border Countries:</Text>

                {
                  borderCountries.length > 0
                    ? <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap='8px' flex={1}>
                      {
                        borderCountries.map((borderCountry, index) => (
                          <GridItem w='100%' key={`border-country-${index}`} justifySelf='center' >
                            <Button
                              w='100%'
                              onClick={() => navigate(`/${borderCountry.toLocaleLowerCase()}`)}
                              shadow='md'
                              background='backgroundWhite'
                              rounded={6}
                            >
                              {borderCountry}
                            </Button>
                          </GridItem>
                        ))
                      }
                    </Grid>
                    : <>No border countries</>
                }
              </Flex>

            </Flex>

          </Flex>
          : isFetching
            ? <Flex flexGrow={1} justify='center' align='center' ><Spinner /></Flex>
            : <>Country not found</>
      }
    </Flex>
  );
}
