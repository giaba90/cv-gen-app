import { VStack, Text, Box, Heading } from '@chakra-ui/react';

function Education() {
    return (
        <VStack align="start" spacing={4} mb={8}>
            <Heading as="h2" size="lg" color="#2c5282">EDUCATION</Heading>
            <Box>
                <Text fontWeight="bold">British Bachelor Degree</Text>
                <Text>San Jose State University</Text>
                <Text color="gray.500">Sep 2014 - May 2017</Text>
                <Text mt={2}>Computing program study focusing on Web/Software develpment and Network</Text>
            </Box>
        </VStack>
    );
}

export default Education;