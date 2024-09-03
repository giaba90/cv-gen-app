import JobList from "../../Components/Backend/Job/JobList";
import AddJob from "../../Components/Backend/Job/AddJob";
import { Box, Container, Heading, HStack } from '@chakra-ui/react';

export default function Job() {

    return (
        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <HStack mt={2} mb={2}>
                    <Heading as='h2'>Esperienze lavorative /</Heading>
                    <Heading as='h3'>Elenco lavori</Heading>
                </HStack>
                <AddJob></AddJob>
            </Box>
            <Box><JobList></JobList></Box>
        </Container>

    );

}
