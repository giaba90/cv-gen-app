import ContactList from "../../Components/Backend/Contact/ContactList";
import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from '../../Components/Backend/Footer/Footer';
import Header from '../../Components/Backend/Header/Header';

export default function Contact() {

    return (
        <Flex flexDirection="column" minHeight="100vh">
        <Header />
        <Container maxW='container.lg' flex="1">
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <ContactList />
            </Box>
        </Container>
        <Footer />
        </Flex>
    );
}
