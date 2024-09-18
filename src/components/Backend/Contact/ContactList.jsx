import { useEffect, useReducer } from 'react';
import { doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from "../../../services/firebase";
import {
    VStack, Text, Heading, Link, Button, Flex, useToast,
    List, ListItem, IconButton, Stack, 
    Spinner, Alert, AlertIcon, useDisclosure, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Container
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const initialState = {
    contactData: null,
    loading: true,
    formData: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_CONTACT_DATA':
            return { ...state, contactData: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        case 'RESET_FORM_DATA':
            return { ...state, formData: {} };
        default:
            return state;
    }
}

const ContactList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const contactRef = doc(db, "db", "contacts");
        const unsubscribe = onSnapshot(contactRef, (doc) => {
            if (doc.exists()) {
                dispatch({ type: 'SET_CONTACT_DATA', payload: doc.data() });
            } else {
                dispatch({ type: 'SET_CONTACT_DATA', payload: null });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "db", "contacts"), state.formData);
            toast({ title: "Contatto aggiornato con successo", status: "success", duration: 3000, isClosable: true });
            onClose();
            dispatch({ type: 'RESET_FORM_DATA' });
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
            dispatch({ type: 'SET_CONTACT_DATA', payload: null });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_FORM_DATA', payload: { ...state.formData, [name]: value } });
    };

    if (state.loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Informazioni di Contatto</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { dispatch({ type: 'RESET_FORM_DATA' }); onOpen(); }}>
                    Aggiungi Contatto
                </Button>
            </Flex>

            {state.contactData ? (
                <List spacing={3} borderWidth={1} borderRadius="lg" p={4}>
                    <ListItem>
                        <Text><strong>Indirizzo:</strong> {state.contactData.address}</Text>
                    </ListItem>
                    <ListItem>
                        <Text><strong>Email:</strong> {state.contactData.email}</Text>
                    </ListItem>
                    <ListItem>
                        <Text><strong>Telefono:</strong> {state.contactData.tel}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            <strong>LinkedIn:</strong>
                            <Link href={state.contactData.linkedin_profile} isExternal ml={2}>
                                {state.contactData.linkedin_profile}
                            </Link>
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Stack direction="row" spacing={4} mt={4}>
                            <IconButton
                                icon={<EditIcon />}
                                aria-label="Modifica contatto"
                                onClick={() => {
                                    dispatch({ type: 'SET_FORM_DATA', payload: state.contactData });
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
                    <ModalHeader>{state.contactData ? 'Modifica Contatto' : 'Aggiungi Contatto'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Indirizzo</FormLabel>
                                    <Input name="address" value={state.formData.address || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input name="email" type="email" value={state.formData.email || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Telefono</FormLabel>
                                    <Input name="tel" type="tel" value={state.formData.tel || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <Input name="linkedin_profile" value={state.formData.linkedin_profile || ''} onChange={handleChange} />
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
