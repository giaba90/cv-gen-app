import { Box, Text, Link, Container } from "@chakra-ui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="gray.200" color="gray.700" py={4}>
      <Container maxW="container.lg">
        <Text textAlign="center">
          © {currentYear} Gianluca Barranca |{" "}
          Sentiti libero di contribuire a 
          <Link
            href="https://github.com/giaba90/cv-gen-app"
            isExternal
            color="teal.500"
          >
            &nbsp; questo progetto
          </Link>
        </Text>
      </Container>
    </Box>
  );
}