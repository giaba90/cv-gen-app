import JobList from "../../Components/Backend/Job/JobList";
import { Box, Container, Heading, HStack } from '@chakra-ui/react';

export default function Job() {

    return (
        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
              <JobList></JobList></Box>
        </Container>

    );

}
