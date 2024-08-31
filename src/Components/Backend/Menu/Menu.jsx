import { Button, Flex, Heading, Spacer, HStack, } from "@chakra-ui/react";
import { signOut, getAuth } from "firebase/auth";

export default function Menu() {
    const auth = getAuth();

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex
            as="nav"
            p={4}
            borderBottom="1px"
            borderColor="gray.200"
            alignItems="center"
        >
            <Heading as="h1" size="lg">
                Admin Panel
            </Heading>
            <Spacer />
            <HStack spacing={4}>
                <Button colorScheme="teal" variant="ghost">
                    Dashboard
                </Button>
                <Button colorScheme="red" variant="ghost" onClick={handleSignOut}>
                    Esci
                </Button>
            </HStack>
        </Flex>
    )
}