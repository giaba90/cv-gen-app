import { Box, Container } from '@chakra-ui/react';
import ReferenceList from "../../Components/Backend/Reference/ReferenceList";

export default function Reference() {

    return (
        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <ReferenceList />
            </Box>
        </Container>

    );
}
