import { ChakraProvider, Box, Grid, Container, theme, extendTheme } from '@chakra-ui/react';
import Hero from '../../Components/Hero';
import Summary from '../../Components/Summary';
import Contact from '../../Components/Contact';
import Skills from '../../Components/Skills';
import Experience from '../../Components/Experience';
import Projects from '../../Components/Projects';
import Education from '../../Components/Education';
import Languages from '../../Components/Languages';
import Footer from '../../Components/Footer';

const customTheme = extendTheme({
  ...theme,
  styles: {
    global: {
      'h2': {
        borderBottom: '1px solid',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
      },
    },
  },
});


function HomePage() {
  return (
    <ChakraProvider theme={customTheme}>
      <Box minHeight="100vh" bg="gray.100" py={8}>
        <Container maxW="container.xl">
          <Grid templateColumns="40% 60%">
            <Box bg="blue.700" color="white" p={6}>
              <Contact />
              <Skills />
              <Languages />
            </Box>
            <Box bg="white" p={6}>
              <Hero />
              <Summary/>
              <Experience />
              <Projects />
              <Education />
            </Box>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;