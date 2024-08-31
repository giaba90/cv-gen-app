import { Box, Grid, Text } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import { FaAddressBook, FaBriefcase, FaComments, FaBookOpenReader, FaMedapps, FaMicrochip } from "react-icons/fa6";
import Menu from "../../Components/Backend/Menu/Menu";

export default function Admin() {

    const listVoice = [
        {
            name: "Istruzione e Formazione",
            icon: FaBookOpenReader
        },
        {
            name: "Esprienza Lavorativa",
            icon: FaBriefcase
        },
        {
            name: "Progetti",
            icon: FaMedapps
        },
        {
            name: "Skills",
            icon: FaMicrochip
        },
        {
            name: "Recensioni",
            icon: FaComments
        },
        {
            name: "Contatti",
            icon: FaAddressBook
        }
    ];

    return (
        <Box>
            <Menu></Menu>
            <Box p={6}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {listVoice.map((el, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="white"
                            boxShadow="md"
                        >
                            <Icon mt={6} boxSize={24} as={el.icon} />
                            <Box p={4}>
                                <Text fontWeight="bold" fontSize="xl" textAlign="center">
                                    {el.name}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
