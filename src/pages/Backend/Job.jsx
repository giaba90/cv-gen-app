import JobList from "../../components/Backend/Job/JobList";
import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from '../../components/Backend/Footer/Footer';
import Header from '../../components/Backend/Header/Header';

export default function Job() {

    return (
        <Flex flexDirection="column" minHeight="100vh">
            <Header />
            <Container maxW='container.lg' flex="1">
                <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <JobList></JobList></Box>
            </Container>
            <Footer />
        </Flex>
    );

}
