import { Button, Flex, Spacer, HStack, } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link } from '@chakra-ui/react'
import { signOut, getAuth } from "firebase/auth";

export default function Menu({ children }) {
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
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {children && (<BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="teal" href='#'>{children}</BreadcrumbLink>
                </BreadcrumbItem>)}
            </Breadcrumb>
            <Spacer />
            <HStack spacing={4}>
                <Link href="/">
                    <Button>
                        Vai al sito
                    </Button></Link>
                <Button colorScheme="red" variant="ghost" onClick={handleSignOut}>
                    Esci
                </Button>
            </HStack>
        </Flex>
    )
}