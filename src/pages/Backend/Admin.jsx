import { Container, Box, Grid, Text, Link, Flex } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import { FaAddressBook, FaBriefcase, FaComments, FaBookOpenReader, FaMedapps, FaMicrochip } from "react-icons/fa6";
import Footer from '../../components/Backend/Footer/Footer';
import Header from '../../components/Backend/Header/Header';
import { motion } from "framer-motion";

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

const containerMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const itemMotion = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
};

const iconMotion = (index) => ({
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }
});

export default function Admin() {

    return (
        <Flex flexDirection="column" minHeight="100vh">
            <Header />
            <Container maxW='container.lg' flex="1" mt={10} mb={10}>
                <motion.div {...containerMotion}>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                        {listVoice.map((el, index) => (
                            <motion.div
                                key={index}
                                {...itemMotion}
                                flexBasis={{ base: "100%", md: "auto" }}
                            >
                                <Link href={el.path}>
                                    <Box
                                        overflow="hidden"
                                        textAlign="center"
                                        borderWidth={1}
                                        borderRadius="lg"
                                        p={4}
                                    >
                                        <motion.div {...iconMotion(index)}>
                                            <Icon color='teal' mt={6} boxSize={24} as={el.icon} />
                                        </motion.div>
                                        <Box p={4}>
                                            <Text fontWeight="bold" fontSize="xl" textAlign="center">
                                                <Link href={el.path}> {el.name}</Link>
                                            </Text>
                                        </Box>
                                    </Box></Link>
                            </motion.div>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
            <Footer />
        </Flex>
    );
}
