import { Button, Flex, Spacer, HStack, } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link, Heading } from '@chakra-ui/react'
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
                    <BreadcrumbLink href='/admin'>
                        <Heading as='h2' size='lg'>
                            Dashboard
                        </Heading>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {children && (<BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="teal" href='#'><Heading as='h2' size='lg'>{children}</Heading></BreadcrumbLink>
                </BreadcrumbItem>)}
            </Breadcrumb>
            <Spacer />
            <HStack spacing={4}>
                <Link href="/">
                    <Button colorScheme='teal' variant='outline'>
                        Vai al sito
                    </Button></Link>
                {/*<Button colorScheme="red" variant="ghost" onClick={handleSignOut}>
                    Esci
                </Button>*/}
            </HStack>
        </Flex>
    )
}