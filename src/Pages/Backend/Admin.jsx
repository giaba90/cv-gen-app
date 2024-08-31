import { Box, Grid, Image, Text } from "@chakra-ui/react";
import Menu from "../../Components/Backend/Menu/Menu";

export default function Admin() {

    return (
        <Box>
            <Menu></Menu>
            <Box p={6}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {[...Array(6)].map((_, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="white"
                            boxShadow="md"
                        >
                            <Image
                                src={`https://via.placeholder.com/300?text=Image+${index + 1}`}
                                alt={`Image ${index + 1}`}
                                objectFit="cover"
                                width="100%"
                                height="200px"
                            />
                            <Box p={4}>
                                <Text fontWeight="bold" fontSize="xl" textAlign="center">
                                    Titolo {index + 1}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
