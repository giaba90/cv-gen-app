import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Textarea,
} from "@chakra-ui/react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbconfig"; // Importa il db configurato
import { Formik, Form, Field } from "formik"; // Importa Formik

const AddJob = () => {
    const [status, setStatus] = useState(null); // Stato per messaggi di successo o errore
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async (values, actions) => {
        try {
            // Riferimento al documento 'experience' nella raccolta principale
            const experienceRef = doc(db, "db", "experience");

            // Riferimento alla nuova raccolta 'jobs' sotto il documento 'experience'
            const jobsCollectionRef = collection(experienceRef, "jobs");

            // Aggiungi un nuovo documento alla raccolta 'jobs'
            await addDoc(jobsCollectionRef, {
                ...values,
                createdAt: serverTimestamp(), // Aggiungi un timestamp al documento
            });

            setStatus({ type: "success", message: "Lavoro aggiunto con successo!" });
            actions.resetForm(); // Resetta i campi del form con Formik
            onClose(); // Chiudi il modale
        } catch (error) {
            console.error("Errore durante l'inserimento del Lavoro:", error);
            setStatus({
                type: "error",
                message: "Errore durante l'inserimento del Lavoro",
            });
        }
    };

    return (
        <Box p={4}>
            {/* Pulsante per aprire il modale */}
            <Button colorScheme="teal" onClick={onOpen}>
                Aggiungi Lavoro
            </Button>

            {/* Modale per il form di aggiunta del lavoro */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Aggiungi Lavoro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Utilizza Formik per gestire il form */}
                        <Formik
                            initialValues={{
                                title: "",
                                company: "",
                                description: "",
                                start: "",
                                end: "",
                                website: "",
                            }}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <VStack spacing={4} align="stretch">
                                        <FormControl isRequired>
                                            <FormLabel>Posizione lavorativa</FormLabel>
                                            <Field as={Input} name="title" type="text" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Azienda</FormLabel>
                                            <Field as={Input} name="company" type="text" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Sito Web</FormLabel>
                                            <Field as={Input} name="website" type="url" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Data Inizio</FormLabel>
                                            <Field as={Input} name="start" type="date" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Data Fine</FormLabel>
                                            <Field as={Input} name="end" type="date" />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Descrizione</FormLabel>
                                            <Field as={Textarea} name="description"
                                                placeholder="Inserisci una descrizione dettagliata"
                                                size="md" />
                                        </FormControl>
                                    </VStack>
                                    <ModalFooter>
                                        <Button
                                            colorScheme="teal"
                                            mr={3}
                                            type="submit"
                                            isLoading={props.isSubmitting}
                                        >
                                            Salva lavoro
                                        </Button>
                                        <Button variant="ghost" onClick={onClose}>
                                            Annulla
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Messaggio di stato utilizzando il componente Alert di Chakra UI */}
            {status && (
                <Alert status={status.type} mt={4}>
                    <AlertIcon />
                    <Box flex="1">
                        <AlertTitle>
                            {status.type === "success" ? "Successo!" : "Errore!"}
                        </AlertTitle>
                        <AlertDescription>{status.message}</AlertDescription>
                    </Box>
                    <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => setStatus(null)}
                    />
                </Alert>
            )}
        </Box>
    );
};

export default AddJob;
