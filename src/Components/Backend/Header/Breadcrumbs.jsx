import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, Text, Container } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box bg="gray.200" p={2} borderRadius="md" align="center">
      <Container maxW="container.lg">
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
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
