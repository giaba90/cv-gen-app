import { useMemo } from "react";
import { FaCog } from "react-icons/fa";
import { db } from "../../../fbconfig";
import { doc, getDoc } from "firebase/firestore";
import { Flex, Text, Box, Avatar, Link, Icon, Container } from "@chakra-ui/react";
import Menu from "./Menu";
import { useQuery } from "@tanstack/react-query";

const TopBar = () => {
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

    return (
        <Flex bg="teal.500" p={2} alignItems="center" >
            <Container maxWidth="container.lg" display="flex" justifyContent="space-between" alignItems="center">
                <Menu aria-label="Menu" />
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
                 {/*   <Button
                        as="a"
                        href="/"
                        target="_blank"
                        rightIcon={<ExternalLinkIcon />}
                        colorScheme="whiteAlpha"
                        mr={2}
                    >
                        Vai al sito
                    </Button> */}
                </Flex>
            </Container>
        </Flex>
    );
};

export default TopBar;