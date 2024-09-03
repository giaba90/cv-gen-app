import { useState } from "react";
import {
    Box,
    Button,
    CloseButton,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
    VStack,
    HStack,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbconfig"; // Importa il db configurato
import { Formik, Form, Field } from "formik"; // Importa Formik

const AddCourse = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState(null); // Stato per messaggi di successo o errore

    const handleSubmit = async (values, actions) => {
        try {
            // Riferimento al documento 'education' nella raccolta principale
            const educationRef = doc(db, "db", "education");

            // Riferimento alla nuova raccolta 'courses' sotto il documento 'education'
            const coursesCollectionRef = collection(educationRef, "courses");

            // Aggiungi un nuovo documento alla raccolta 'courses'
            await addDoc(coursesCollectionRef, {
                ...values,
                createdAt: serverTimestamp(), // Aggiungi un timestamp al documento
            });

            setStatus({ type: "success", message: "Corso aggiunto con successo!" });
            actions.resetForm(); // Resetta i campi del form
            onClose(); // Chiudi il modale dopo il successo
        } catch (error) {
            console.error("Errore durante l'inserimento del corso:", error);
            setStatus({
                type: "error",
                message: "Errore durante l'inserimento del corso",
            });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Box p={4}>
            <Button colorScheme="teal" onClick={onOpen}>
                Aggiungi Corso
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Aggiungi Corso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                title: "",
                                description: "",
                                start: "",
                                end: "",
                                school: "",
                                link: "",
                                website: "",
                            }}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <VStack spacing={4}>
                                        <FormControl isRequired>
                                            <FormLabel>Titolo di studio:</FormLabel>
                                            <Field as={Input} name="title" type="text" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Scuola o Università:</FormLabel>
                                            <Field as={Input} name="school" type="text" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Sito Web:</FormLabel>
                                            <Field as={Input} name="website" type="url" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Data Inizio:</FormLabel>
                                            <Field as={Input} name="start" type="date" />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Data Fine:</FormLabel>
                                            <Field as={Input} name="end" type="date" />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Descrizione:</FormLabel>
                                            <Field
                                                as={Textarea}
                                                name="description"
                                                placeholder="Inserisci una descrizione dettagliata"
                                                size="md"
                                            />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Link:</FormLabel>
                                            <Field as={Input} name="link" type="url" />
                                        </FormControl>
                                    </VStack>
                                    <ModalFooter>
                                        <Button
                                            colorScheme="teal"
                                            mr={3}
                                            type="submit"
                                            isLoading={props.isSubmitting}
                                        >
                                            Salva corso
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

export default AddCourse;
