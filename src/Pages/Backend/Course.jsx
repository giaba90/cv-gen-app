import CourseList from '../../Components/Backend/Course/CourseList';
import { Box, Container } from '@chakra-ui/react';
export default function Course() {
    return (

        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <CourseList />
            </Box>
        </Container>

    );
}
