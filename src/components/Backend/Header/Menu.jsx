import { Icon, HStack, VStack, Button, Drawer, Hide, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Istruzione e formazione", path: "/admin/istruzione" },
  { name: "Esperienze lavorative", path: "/admin/esperienze" },
  { name: "Progetti", path: "/admin/progetti" },
  { name: "Competenze", path: "/admin/competenze" },
  { name: "Recensioni", path: "/admin/recensioni" },
  { name: "Contatti", path: "/admin/contatti" },
];

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <Button
        onClick={onOpen}
        colorScheme="whiteAlpha"
        aria-label="Open menu"
      ><Icon as={HamburgerIcon} /> <Hide below='md'> &nbsp; Menu </Hide>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
         
          <DrawerHeader borderBottomWidth={1} borderBottomColor="gray.200" fontSize="2xl" fontWeight="bold">
            <Button
              as="a"
              href="/"
              target="_blank"
              width="100%"
            >
              Vedi CV
            </Button>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  as={Link}
                  to={item.path}
                  onClick={onClose}
                  colorScheme="teal"
                  variant="ghost"
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
            <HStack
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              p={4}
              borderTop="1px"
              borderColor="gray.200"
              spacing={4}
            >

              <Button
                onClick={() => {
                  onClose();
                  handleSignOut();
                }}
                width="100%"
              >
                Esci
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
