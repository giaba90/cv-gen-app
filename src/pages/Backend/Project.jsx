import ProjectList from "../../components/Backend/Project/ProjectsList";
import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from '../../components/Backend/Footer/Footer';
import Header from '../../components/Backend/Header/Header';

export default function Project() {

    return (
        <Flex flexDirection="column" minHeight="100vh">
            <Header />
            <Container maxW='container.lg' flex="1">
                <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <ProjectList></ProjectList>
                </Box>
            </Container>
            <Footer />
        </Flex>
    );
}
