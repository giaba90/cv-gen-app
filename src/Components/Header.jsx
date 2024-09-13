import { Heading, Text, VStack } from '@chakra-ui/react';


function Header() {
    return (
        <VStack align="center" spacing={4} >
            <Heading as="h1" size="2xl">RICHARD SCOTT</Heading>
            <Text fontSize="xl" fontWeight="bold" color="gray.600">WEB DEVELOPER</Text>

        </VStack>
    );
}

export default Header;