import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" textAlign="center" py={4} bg="gray.100">
      <Text fontSize="sm">
        © {currentYear} Gianluca Barranca. All rights reserved. {' '}
        <Link href="/admin" color="blue.500">
          Accedi
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;