import ProjectList from "../../Components/Backend/Project/ProjectsList";
import { Box, Container } from '@chakra-ui/react';

export default function Project() {

    return (
    <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
        <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
            <ProjectList></ProjectList>
        </Box>
    </Container>
    );
}
