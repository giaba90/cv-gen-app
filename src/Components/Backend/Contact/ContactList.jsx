import { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../../fbconfig";
import {
    VStack, Text, Heading, Link, Button, Flex, useToast,
    List, ListItem, IconButton, Stack, 
    Spinner, Alert, AlertIcon, useDisclosure, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Container
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ContactList = () => {
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const contactRef = doc(db, "db", "contacts");
        const unsubscribe = onSnapshot(contactRef, (doc) => {
            if (doc.exists()) {
                setContactData(doc.data());
            } else {
                setContactData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "db", "contacts"), formData);
            toast({ title: "Contatto aggiornato con successo", status: "success", duration: 3000, isClosable: true });
            onClose();
        } catch (error) {
            console.error('Error adding document:', error);
            toast({ title: "Errore nell'aggiornamento del contatto", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'db', 'contacts'));
            toast({
                title: "Contatto eliminato con successo",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setContactData(null);
        } catch (error) {
            console.error('Error deleting document:', error);
            toast({
                title: "Errore nell'eliminazione del contatto",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Informazioni di Contatto</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
                    Aggiungi Contatto
                </Button>
            </Flex>

            {contactData ? (
                <List spacing={3} borderWidth={1} borderRadius="lg" p={4}>
                    <ListItem>
                        <Text><strong>Indirizzo:</strong> {contactData.address}</Text>
                    </ListItem>
                    <ListItem>
                        <Text><strong>Email:</strong> {contactData.email}</Text>
                    </ListItem>
                    <ListItem>
                        <Text><strong>Telefono:</strong> {contactData.tel}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            <strong>LinkedIn:</strong>
                            <Link href={contactData.linkedin_profile} isExternal ml={2}>
                                {contactData.linkedin_profile}
                            </Link>
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Stack direction="row" spacing={4} mt={4}>
                            <IconButton
                                icon={<EditIcon />}
                                
                                aria-label="Modifica contatto"
                                onClick={() => {
                                    setFormData(contactData);
                                    onOpen();
                                }}
                            />
                            <IconButton
                                icon={<DeleteIcon />}
                             
                                aria-label="Elimina contatto"
                                onClick={handleDelete}
                            />
                        </Stack>
                    </ListItem>
                </List>
            ) : (
                <Alert status="info">
                    <AlertIcon />
                    Nessuna informazione di contatto disponibile.
                </Alert>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{contactData ? 'Modifica Contatto' : 'Aggiungi Contatto'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Indirizzo</FormLabel>
                                    <Input name="address" value={formData.address || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input name="email" type="email" value={formData.email || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Telefono</FormLabel>
                                    <Input name="tel" type="tel" value={formData.tel || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <Input name="linkedin_profile" value={formData.linkedin_profile || ''} onChange={handleChange} />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="teal" mr={3}>
                                Salva
                            </Button>
                            <Button onClick={onClose}>Annulla</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default ContactList;
