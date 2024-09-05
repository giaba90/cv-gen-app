import ContactList from "../../Components/Backend/Contact/ContactList";
import { Box, Container } from '@chakra-ui/react';

export default function Contact() {

    return (
        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <ContactList />
            </Box>
        </Container>
    );
}
