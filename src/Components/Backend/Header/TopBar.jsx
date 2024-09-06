import { Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "./Menu";

const TopBar = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/signin");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Flex bg="teal.500" p={2} alignItems="center">
            <Menu aria-label="Menu" />
            <Spacer />
            <Text as="h1" fontSize="xl" fontWeight="bold" color="white">
            CV Generator App
            </Text>
            <Spacer />
            <Flex>
                <Button
                    as="a"
                    href="/"
                    target="_blank"
                    rightIcon={<ExternalLinkIcon />}
                    colorScheme="whiteAlpha"
                    mr={2}
                >
                    Vai al sito
                </Button>
                <Button onClick={handleSignOut} colorScheme="whiteAlpha">
                    Esci
                </Button>
            </Flex>
        </Flex>
    );
};

export default TopBar;