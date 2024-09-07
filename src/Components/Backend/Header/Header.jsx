import { Box } from "@chakra-ui/react";
import TopBar from "./TopBar";
import Breadcrumbs from "./Breadcrumbs";
const Header = () => {
  return (
    <Box as="header">
      <TopBar />
      <Breadcrumbs />
    </Box>
  );
};

export default Header;
