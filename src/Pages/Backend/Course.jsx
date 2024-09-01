import CourseList from '../../Components/Backend/Course/CourseList';
import AddCourse from '../../Components/Backend/Course/AddCourse';
import Menu from '../../Components/Backend/Menu/Menu'
import { Box, Container, Heading } from '@chakra-ui/react';
export default function Course() {
    return (
        <div>
            <Menu>Istruzione e Formazione</Menu>
            <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column' m='0'>
                <Box><Heading as='h3' size='lg' mt='4' mb='4'>Elenco corsi</Heading></Box>
                <Box><CourseList></CourseList></Box>
                <Box><AddCourse></AddCourse></Box>
            </Container>
        </div>
    );
}
