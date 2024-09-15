import { Box, Text, VStack, Heading } from '@chakra-ui/react';

function Summary() {
    return (
        <VStack align="start" spacing={4} mb={8}>
            <Heading as="h2" size="lg" color="#2c5282">SUMMARY</Heading>
            <Box>
                <Text>• Self-independent, reliable and friendly individual who works hard to achieve his goals.</Text>
                <Text>• Adaptable quickly, and organized well. Interested in learning the latest web & software technologies quickly.</Text>
                <Text>• Able to work well in teams as well as individually. My future goal is to become a senior full-stack developer.</Text>
            </Box>
        </VStack>
    );
}

export default Summary;