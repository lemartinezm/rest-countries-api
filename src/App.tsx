import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Details } from './pages/Details';
import { Home } from './pages/Home';

function App () {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const textColorMode = useColorModeValue('Dark Mode', 'Light Mode');
  return (
    <Flex
      minH='100vh'
      flexDir='column'
    >

      <Flex
        as='header'
        justify='space-between'
        align='center'
        shadow='md'
        px={{ base: '16px', md: '40px', lg: '80px' }}
        py={6}
      >
        <Heading as='h1' fontSize={{ base: 16, md: 24 }} >Where in the world?</Heading>
        <Button
          leftIcon={colorModeIcon}
          onClick={toggleColorMode}
          variant='ghost'
        >
          {textColorMode}
        </Button>
      </Flex>

      <Router>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/:name' element={<Details />} />
        </Routes>
      </Router>

    </Flex>
  );
}

export default App;
