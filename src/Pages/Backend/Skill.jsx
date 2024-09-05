import { Box, Container } from '@chakra-ui/react';
import SkillList from "../../Components/Backend/Skill/SkillList";

export default function Skill() {

    return (
        <Container maxW='container.lg' alignItems='start' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
                <SkillList />
            </Box>
        </Container>
    );
}
