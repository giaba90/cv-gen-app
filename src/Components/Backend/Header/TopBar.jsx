import { Flex, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Spacer } from "@chakra-ui/react";
import { ExternalLinkIcon, ChevronRightIcon } from "@chakra-ui/icons";
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

    const getBreadcrumbItems = () => {
        const path = location.pathname.split('/').filter(Boolean);
        if (path.length === 1 && path[0] === 'admin') {
            return [{ label: 'Dashboard', href: '/admin' }];
        }
        return [
            { label: 'Dashboard', href: '/admin' },
            { label: path[1].charAt(0).toUpperCase() + path[1].slice(1), href: location.pathname }
        ];
    };

    return (
        <Flex bg="teal.500" p={2} alignItems="center">
            <Menu />
            <Spacer />
            <Breadcrumb separator={<ChevronRightIcon color="white" />} color="white" fontSize="lg" fontWeight="bold">
                {getBreadcrumbItems().map((item, index) => (
                    <BreadcrumbItem key={index} isCurrentPage={index === getBreadcrumbItems().length - 1}>
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
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