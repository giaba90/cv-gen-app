import { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../../fbconfig";
import {
    VStack, Text, Heading, Image, Link, Button, Flex, useToast,
    List, ListItem, IconButton, Stack, 
    Spinner, Alert, AlertIcon, useDisclosure, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Container
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ContactList = () => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const contactRef = doc(db, "db", "contacts");
        const contactCollectionRef = collection(contactRef, "contact");

        const unsubscribe = onSnapshot(
            contactCollectionRef,
            (snapshot) => {
                setContactData(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
                setLoading(false);
            },
            (err) => {
                console.error("Errore durante il recupero dei contatti:", err);
                toast({
                    title: "Errore durante il recupero dei contatti",
                    status: "error",
                    isClosable: true,
                });
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [toast]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'db', 'contact'), formData);
            toast({
                title: "Contact updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            fetchContactData();
        } catch (error) {
            console.error('Error updating document:', error);
            toast({
                title: "Error updating contact",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'db', 'contact'));
            toast({
                title: "Contact deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setContactData(null);
        } catch (error) {
            console.error('Error deleting document:', error);
            toast({
                title: "Error deleting contact",
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
             <Flex justifyContent="space-between" alignItems="center" mb={4} mt={4}>
                <Heading size="lg">Elenco contatti</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
                    Aggiungi contatto
                </Button>
            </Flex>


            {contactData.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    Nessun contatto disponibile nel database.
                </Alert>
            ) : (
                <List spacing={6}>
                    {contactData.map((contact) => (
                        <ListItem key={contact.id} borderWidth={1} borderRadius="lg" p={4}>
                            <Flex justify="space-between" align="center" mb={4}>
                            {contactData.profile_image_url && (
                        <Image
                            src={contact.profile_image_url}
                            alt="Profile"
                            boxSize="150px"
                            borderRadius="full"
                            objectFit="cover"
                                    />
                                )}
                                <Stack direction="row">
                                    <IconButton icon={<EditIcon />} onClick={() => handleEditClick(contact)} aria-label="Edit contact" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(contact.id)} aria-label="Delete contact" />
                                </Stack>
                            </Flex>
                            <VStack align="start" spacing={2}>
                            <Text><strong>Indirizzo:</strong> {contact.address}</Text>
                    <Text><strong>Email:</strong> {contact.email}</Text>
                    <Text><strong>Telefono:</strong> {contact.tel}</Text>
                    <Text>
                        <strong>Linkedin:</strong>
                        <Link href={contactData.linkedin_profile} isExternal ml={2}>
                            {contactData.linkedin_profile}
                                    </Link>
                                </Text>
                            </VStack>
                        </ListItem>
                    ))}
                </List>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{formData.id ? 'Edit Contact' : 'Add Contact'}</ModalHeader>
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
                                <FormControl>
                                    <FormLabel>Immagine profilo</FormLabel>
                                    <Input name="profile_image_url" value={formData.profile_image_url || ''} onChange={handleChange} />
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
