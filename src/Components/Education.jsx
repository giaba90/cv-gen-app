import { VStack, Text, Box, Heading, Flex } from '@chakra-ui/react';

function Education() {
    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#2c5282">EDUCATION</Heading>
            {[
                {
                    degree: 'British Bachelor Degree',
                    institution: 'San Jose State University',
                    period: 'Sep 2014 - May 2017',
                    description: 'Computing program study focusing on Web/Software development and Network',
                },
            ].map((edu, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{edu.degree}</Text>
                        <Text color="#2c5282" fontWeight="bold">{edu.period}</Text>
                    </Flex>
                    <Text>{edu.institution}</Text>
                    <Text mt={2}>{edu.description}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Education;