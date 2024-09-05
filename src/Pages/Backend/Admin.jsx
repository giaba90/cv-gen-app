import { Container, Box, Grid, Text, Link, Flex } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import { FaAddressBook, FaBriefcase, FaComments, FaBookOpenReader, FaMedapps, FaMicrochip } from "react-icons/fa6";
import Footer from '../../Components/Backend/Footer/Footer';
import Header from '../../Components/Backend/Header/Header';
export default function Admin() {

    const listVoice = [
        {
            path: "/admin/istruzione",
            name: "Istruzione e Formazione",
            icon: FaBookOpenReader
        },
        {
            path: "/admin/esperienze",
            name: "Esperienze Lavorative",
            icon: FaBriefcase
        },
        {
            path: "/admin/progetti",
            name: "Progetti",
            icon: FaMedapps
        },
        {
            path: "/admin/competenze",
            name: "Competenze",
            icon: FaMicrochip
        },
        {
            path: "/admin/recensioni",
            name: "Recensioni",
            icon: FaComments
        },
        {
            path: "/admin/contatti",
            name: "Contatti",
            icon: FaAddressBook
        }
    ];

    return (
        <Flex flexDirection="column" minHeight="100vh">
            <Header />
            <Container maxW='container.lg' flex="1">
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {listVoice.map((el, index) => (
                        <Box
                            key={index}
                            overflow="hidden"
                            textAlign="center"
                        >
                            <Icon color='teal' mt={6} boxSize={24} as={el.icon} />
                            <Box p={4}>
                                <Text fontWeight="bold" fontSize="xl" textAlign="center">
                                    <Link href={el.path}> {el.name}</Link>
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </Flex>
    );
}
