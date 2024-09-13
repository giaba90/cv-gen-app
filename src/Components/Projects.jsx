import { VStack, Text, Box, Heading, Flex } from '@chakra-ui/react';

const projects = [
    {
        name: 'Costs Calculator for a socks company',
        period: 'Jan 2017 - Apr 2017',
        details: [
            'Developed in PHP & MySql (Yii 2 framework Adv-template)',
            'Calculate the price of socks products and to issue price lists and invoices.',
            'Customers who visit the online showroom can ask for a price list.',
            'The sales representative, by logging in, can provide the price list, add new products, and issue invoices with shipping cost fees and commission fees if they are required.',
        ],
    },
    {
        name: 'Website similar to YouTube',
        period: 'Nov 2016 - Dec 2016',
        details: [
            'Developed in PHP & Mysql ( Yii 2 framework basic template):',
            'Registered users can add videos, like, dislike, comment.',
            'Admin manage the whole website.',
        ],
    },
    {
        name: 'Medicine E-commerce',
        period: 'Apr 2015 - Apr 2015',
        details: [
            'Developed in OOP, ADO.NET in C#',
            'The user can add, delete, and update a medicine & a customer.',
            'Also, the user can issue the sales invoice.',
            'Multiple users can login to this application and only the administrator can see a report to know the login and logout (date & time) for each user.',
        ],
    },
];

function Projects() {
    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#2c5282">PROJECTS</Heading>
            {projects.map((project, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{project.name}</Text>
                        <Text color="#2c5282" fontWeight="bold">{project.period}</Text>
                    </Flex>
                    <Text mt={2}>{project.details.join(' ')}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Projects;