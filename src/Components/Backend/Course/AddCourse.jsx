import { useState } from "react";
import {
    Box,
    Button,
    CloseButton,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    Textarea,
    VStack,
    HStack,
    useDisclosure,
} from "@chakra-ui/react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbconfig" // Importa il db configurato

const AddCourse = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [school, setSchool] = useState("");
    const [link, setLink] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            // Riferimento al documento 'education' nella raccolta principale
            const educationRef = doc(db, "db", "education");

            // Riferimento alla nuova raccolta 'courses' sotto il documento 'education'
            const coursesCollectionRef = collection(educationRef, "courses");

            // Aggiungi un nuovo documento alla raccolta 'courses'
            await addDoc(coursesCollectionRef, {
                title,
                description,
                start,
                end,
                school,
                link,
                website,
                createdAt: serverTimestamp(), // Aggiungi un timestamp al documento
            });

            setStatus("Corso aggiunto con successo!");
            // Resetta i campi del form
            setTitle("");
            setDescription("");
            setStart("");
            setEnd("");
            setSchool("");
            setLink("");
            setWebsite("");
            onClose(); // Chiudi il modal dopo il successo
        } catch (error) {
            console.error("Errore durante l'inserimento del corso:", error);
            setStatus("Errore durante l'inserimento del corso");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={4}>
            <Button colorScheme="teal" onClick={onOpen}>
                Aggiungi Corso
            </Button>
            <Modal isOpen={isOpen} size="xl" onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={80}>
                            <Text>Aggiungi Corso</Text>
                            <CloseButton onClick={onClose} />
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Titolo di studio:</FormLabel>
                                    <Input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Scuola o Università:</FormLabel>
                                    <Input
                                        type="text"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Sito Web:</FormLabel>
                                    <Input
                                        type="url"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </FormControl>
                                <HStack spacing={48}>
                                    <FormControl>
                                        <FormLabel>Data Inizio:</FormLabel>
                                        <Input
                                            type="date"
                                            value={start}
                                            onChange={(e) => setStart(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Data Fine:</FormLabel>
                                        <Input
                                            type="date"
                                            value={end}
                                            onChange={(e) => setEnd(e.target.value)}
                                        />
                                    </FormControl>
                                </HStack>
                                <FormControl isRequired>
                                    <FormLabel>Descrizione:</FormLabel>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Inserisci una descrizione dettagliata"
                                        size="md"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link:</FormLabel>
                                    <Input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </FormControl>
                                <Button
                                    colorScheme="teal"
                                    type="submit"
                                    isLoading={loading}
                                    loadingText="Caricamento..."
                                >
                                    Salva Corso
                                </Button>
                            </VStack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {status && (
                            <Text
                                mt={4}
                                color={status.includes("Errore") ? "red.500" : "green.500"}
                            >
                                {status}
                            </Text>
                        )}

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AddCourse;
