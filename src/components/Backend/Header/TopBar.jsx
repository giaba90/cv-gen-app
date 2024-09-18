import { useMemo } from "react";
import { FaCog, FaArrowLeft } from "react-icons/fa";
import { db } from "../../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Flex, Text, Box, Avatar, Link, Icon, Container, Button } from "@chakra-ui/react";
import Menu from "./Menu";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();

    const fetchBioData = async () => {
        const docRef = doc(db, 'Bio', 'summary');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                name: data.name || "",
                photo: data.photo || ""
            };
        }
        return { name: "", photo: "" };
    };

    const { data: bioData, error, isLoading } = useQuery({
        queryKey: ['bioData'],
        queryFn: fetchBioData,
    });

    useMemo(() => {
        if (error) {
            console.error("Errore durante il recupero dei dati:", error);
        }
    }, [error]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Flex bg="teal.500" p={2} alignItems="center" >
            <Container maxWidth="container.lg" display="flex" justifyContent="space-between" alignItems="center">
                <Flex>
                    <Menu aria-label="Menu" />
                    <Button
                        onClick={handleGoBack}
                        aria-label="Go back"
                        colorScheme="whiteAlpha" 
                        ml={2}
                    >
                        <Icon as={FaArrowLeft} />&nbsp; Indietro
                    </Button>
                </Flex>
                <Text as="h1" fontSize="xl" fontWeight="bold" color="white">CV Generator App</Text>
                <Flex >
                    <Box>
                        <Flex alignItems="center">
                            {isLoading ? (
                                <Text color="white">Loading...</Text>
                            ) : (
                                <>
                                    <Avatar size="sm" src={bioData?.photo} mr={2} />
                                    <Text color="white" fontWeight="bold" mr={2}>
                                        Benvenuto {bioData?.name}
                                    </Text>
                                    <Link href="/admin/profilo">
                                        <Icon as={FaCog} color="white" />
                                    </Link>
                                </>
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </Flex>
    );
};

export default TopBar;