import { Box, Grid, Text, Link } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import { FaAddressBook, FaBriefcase, FaComments, FaBookOpenReader, FaMedapps, FaMicrochip } from "react-icons/fa6";
import Menu from "../../Components/Backend/Menu/Menu";

export default function Admin() {

    const listVoice = [
        {
            path: "/admin/course",
            name: "Istruzione e Formazione",
            icon: FaBookOpenReader
        },
        {
            path: "/admin/job",
            name: "Esprienza Lavorativa",
            icon: FaBriefcase
        },
        {
            path: "/admin/project",
            name: "Progetti",
            icon: FaMedapps
        },
        {
            path: "/admin/skill",
            name: "Skills",
            icon: FaMicrochip
        },
        {
            path: "/admin/reference",
            name: "Recensioni",
            icon: FaComments
        },
        {
            path: "/admin/contact",
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
                            overflow="hidden"
                            bg="trasparent"
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
            </Box>
        </Box>
    );
}
