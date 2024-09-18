import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Summary() {
    const [summaryText, setSummaryText] = useState('');

    useEffect(() => {
        async function fetchSummary() {
            const summaryDoc = await getDoc(doc(db, 'Bio', 'summary'));
            if (summaryDoc.exists()) {
                setSummaryText(summaryDoc.data().description || '');
            }
        }
        fetchSummary();
    }, []);

    return (
        <VStack align="start" spacing={4} mb={8}>
            <Heading as="h2" size="lg" color="#005C85">SUMMARY</Heading>
            <Box>
                <Text>{summaryText}</Text>
            </Box>
        </VStack>
    );
}

export default Summary;