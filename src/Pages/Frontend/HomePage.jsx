import { Image, Box } from '@chakra-ui/react'
import comingSoonImage from '../../assets/coming-soon.jpg' // Add this import

export default function HomePage() {

    return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Image
        src={comingSoonImage} // Use the imported image here
        alt="Coming Soon"
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </Box>
    );
}
