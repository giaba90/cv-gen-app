import { VStack, Text, HStack, Circle, Heading } from '@chakra-ui/react';

const languages = [
    { name: 'English', level: 5 },
    { name: 'French', level: 4 },
    { name: 'Arabic', level: 3 },
    { name: 'German', level: 2 },
];

function Languages() {
    return (
        <VStack align="start" spacing={4}>
            <Heading as="h2" size="lg">LANGUAGES</Heading>
            {languages.map((lang, index) => (
                <HStack key={index} justify="space-between" width="100%">
                    <Text>{lang.name}</Text>
                    <HStack>
                        {[...Array(5)].map((_, i) => (
                            <Circle key={i} size="10px" bg={i < lang.level ? "blue.500" : "gray.300"} />
                        ))}
                    </HStack>
                </HStack>
            ))}
        </VStack>
    );
}

export default Languages;