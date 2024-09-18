import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    Heading,
    VStack,
    Text,
} from "@chakra-ui/react";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Stato per gestire errori di autenticazione
    const auth = getAuth();
    const navigate = useNavigate();

    async function handleSignIn(e) {
        e.preventDefault();
        setError(""); // Resetta l'errore prima di tentare l'autenticazione

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            navigate("/admin");
        } catch (error) {
            console.error(error);
            setError("Failed to sign in. Please check your email and password.");
        }
    }

    return (
        <Box maxWidth="400px" mx="auto" mt="8" boxShadow="lg"  // Aggiunta l'ombra qui
            p="6"
            borderRadius="md"
            bg="white">
            <Heading as="h1" mb="6" textAlign="center">
                Login
            </Heading>
            <VStack spacing="4" as="form" onSubmit={handleSignIn}>
                <FormControl id="email" isInvalid={!!error}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl id="password" isInvalid={!!error}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <FormErrorMessage>
                            {error}
                        </FormErrorMessage>
                    )}
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                    Entra
                </Button>
            </VStack>

            {error && (
                <Text color="red.500" mt="4" textAlign="center">
                    {error}
                </Text>
            )}
        </Box>
    );
}
