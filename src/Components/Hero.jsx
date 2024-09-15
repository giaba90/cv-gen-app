import { Heading, Text, VStack, Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../fbconfig';
import { doc, getDoc } from 'firebase/firestore';

function Hero() {
    const fetchBioData = async () => {
        const docRef = doc(db, 'Bio', 'summary');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                name: data.name || '',
                surname: data.surname || '',
                qualification: data.qualification || ''
            };
        }
        return { name: '', surname: '', qualification: '' };
    };

    const { data: bioData, isLoading, error } = useQuery({
        queryKey: ['bioData'],
        queryFn: fetchBioData
    });

    if (isLoading) return <Box>Loading...</Box>;
    if (error) return <Box>An error occurred: {error.message}</Box>;

    return (
        <Box bg="gray.100" p={4} borderRadius="md" mb={4}>
            <VStack align="center" spacing={4}>
                <Heading as="h1" size="2xl" borderBottom="2px solid" paddingBottom={2}>
                    {bioData.name.toUpperCase()} {bioData.surname.toUpperCase()}
                </Heading>
                <Text fontSize="xl" fontWeight="bold" color="gray.600">{bioData.qualification}</Text>
            </VStack>
        </Box>
    );
}

export default Hero;