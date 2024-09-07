import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, Text, Container , Link} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation , useNavigate} from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
        await signOut(auth);
        navigate("/signin");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};


  return (
    <Box bg="gray.200" p={2} borderRadius="md" align="center">
      <Container maxW="container.lg" display="flex" justifyContent="space-between" alignItems="center">
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
        <Text as="i" fontSize="sm" color="gray.500"> Ti trovi in:&nbsp;</Text>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <BreadcrumbItem key={name} isCurrentPage={isLast}> 
              <BreadcrumbLink href={routeTo} color="black" isCurrentPage={isLast}>
             <Text as="i" fontSize="sm" color="gray.500">  {name === 'admin' ? 'Dashboard' : name.charAt(0).toUpperCase() + name.slice(1)}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Link onClick={handleSignOut} fontSize="sm" color="gray.500">Esci</Link>
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
