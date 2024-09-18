import { Box, Text, Link, Container, IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigateToWebsite = () => {
    navigate("/");
  };

  return (
    <Box position="relative">
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
      <IconButton
        icon={<ExternalLinkIcon />}
        aria-label="Go to website"
        onClick={handleNavigateToWebsite}
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="teal"
        size="lg"
        isRound
        boxShadow="md"
        _hover={{ boxShadow: "lg" }}
      />
    </Box>
  );
}