import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CountrySchema } from '../hooks/useAllCountries';

type CardCountryProps = {
  country: CountrySchema;
}

export function CardCountry ({ country }: CardCountryProps) {
  const navigate = useNavigate();

  return (
    <Flex
      as='article'
      flexDir='column'
      w='280px'
      alignSelf='center'
      justifySelf='center'
      rounded={6}
      overflow='hidden'
      shadow='sm'
      background='backgroundWhite'
      onClick={() => navigate(country.name.common.toLowerCase())}
    >
      <Image src={country.flags.png} alt={`${country.name.common} flag`} />

      <Flex
        flexDir='column'
        p={6}
      >
        <Heading as='h2' fontSize='20px' mb={4} >{country.name.common}</Heading>
        <Text>
          <Text as='span' fontWeight={600}>Population:</Text> {country.population}
        </Text>
        <Text>
          <Text as='span' fontWeight={600}>Region:</Text> {country.region}
        </Text>
        <Text>
          <Text as='span' fontWeight={600}>Capital:</Text> {country.capital}
        </Text>
      </Flex>
    </Flex>
  );
}
