import { ChakraProvider, Box, Flex, Container, theme, extendTheme } from '@chakra-ui/react';
import Hero from '../../components/Hero'
import Summary from '../../components/Summary';
import Contact from '../../components/Frontend/Contact';
import Skills from '../../components/Frontend/Skills';
import Experience from '../../components/Frontend/Experience';
import Projects from '../../components/Frontend/Projects';
import Education from '../../components/Frontend/Education';
import Footer from '../../components/Frontend/Footer';

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
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <Box bg="#005C85" color="white" p={6} flexBasis={{ base: "100%", md: "30%" }}>
              <Contact />
              <Skills />
            </Box>
            <Box bg="white" p={6} flexBasis={{ base: "100%", md: "70%" }}>
              <Hero />
              <Summary/>
              <Experience />      
              <Education />
              <Projects />
            </Box>
          </Flex>
        </Container>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;