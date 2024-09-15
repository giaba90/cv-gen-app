import { VStack, Text, Box, Heading, Flex } from '@chakra-ui/react';

const experiences = [
    {
        title: 'Web Developer',
        company: 'Graficon',
        period: 'Apr 2018 - Present',
        description: 'Developing PHP and JS Web Apps.',
    },
    {
        title: 'Software Eng',
        company: 'Foxmedia',
        period: 'Nov 2017 - Nov 2017',
        description: 'One month training after graduation (2 Projects in React & Redux).',
    },
];

function Experience() {
    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#2c5282">EXPERIENCE</Heading>
            {experiences.map((exp, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{exp.title}</Text>
                        <Text color="#2c5282" fontWeight="bold">{exp.period}</Text>
                    </Flex>
                    <Text>{exp.company}</Text>
                    <Text mt={2}>{exp.description}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Experience;