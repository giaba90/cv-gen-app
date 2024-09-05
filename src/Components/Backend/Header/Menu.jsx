import { Icon, VStack, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

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

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="whiteAlpha" 
        aria-label="Open menu"
      ><Icon as={HamburgerIcon} /> &nbsp; Menu
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={1} borderBottomColor="gray.200" fontSize="2xl" fontWeight="bold">Menu</DrawerHeader>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
