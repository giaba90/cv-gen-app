import CourseList from '../../Components/Backend/Course/CourseList';
import AddCourse from '../../Components/Backend/Course/AddCourse';
import Menu from '../../Components/Backend/Menu/Menu'
import { Box, Container, Heading, HStack } from '@chakra-ui/react';
export default function Course() {
    return (
        <div>
            <Menu>Istruzione e Formazione</Menu>
            <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column' m='0'>
                <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <HStack mt={2} mb={2}>
                        <Heading as='h2'>Istruzione & Formazione /</Heading>
                        <Heading as='h3'>Elenco corsi</Heading>
                    </HStack>
                    <AddCourse></AddCourse>
                </Box>
                <Box><CourseList></CourseList></Box>
            </Container>
        </div>
    );
}
