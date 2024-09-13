import { Heading, Text, VStack, Box } from '@chakra-ui/react';

function Header() {
    return (
        <Box bg="gray.100" p={4} borderRadius="md" mb={4}>
            <VStack align="center" spacing={4}>
                <Heading as="h1" size="2xl" borderBottom="2px solid" paddingBottom={2}>RICHARD SCOTT</Heading>
                <Text fontSize="xl" fontWeight="bold" color="gray.600">WEB DEVELOPER</Text>
            </VStack>
        </Box>
    );
}

export default Header;