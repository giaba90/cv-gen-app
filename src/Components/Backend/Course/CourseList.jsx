import { useState, useEffect } from "react";
import {
    Box, VStack, Text, Heading, Link, Button, IconButton, Input, FormControl,
    FormLabel, Flex, Spinner, useToast, Alert, AlertIcon, Stack,
    List, ListItem, Divider, Textarea,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
    ModalBody, ModalCloseButton, Badge, Container
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig";
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching courses:", err);
                toast({ title: "Error fetching courses", status: "error", isClosable: true });
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [toast]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "db", "education", "courses", id));
            toast({ title: "Corso eliminato con successo", status: "success", isClosable: true });
        } catch (err) {
            console.error("Errore nel eliminare il corso:", err);
            toast({ title: "Errore nel eliminare il corso", status: "error", isClosable: true });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "db", "education", "courses", formData.id), formData);
            toast({ title: "Corso aggiornato con successo", status: "success", isClosable: true });
            onClose();
        } catch (err) {
            console.error("Errore nel aggiornare il corso:", err);
            toast({ title: "Errore nel aggiornare il corso", status: "error", isClosable: true });
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleEditClick = (course) => {
        setFormData(course);
        onOpen();
    };
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    if (loading) return <Spinner size="xl" />;

    return (
        <Container maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Elenco corsi</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
                    Aggiungi corso
                </Button>
            </Flex>
            {courses.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    Nessun corso disponibile nel database.
                </Alert>
            ) : (
                <List mb={4} spacing={6}>
                    {courses.map((course) => (
                        <ListItem key={course.id} borderWidth={1} borderRadius="lg" p={4}>
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading size="md">{course.title}</Heading>
                                <Stack direction="row">
                                    <IconButton icon={<EditIcon />} onClick={() => handleEditClick(course)} aria-label="Modifica corso" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(course.id)} aria-label="Elimina corso" />
                                </Stack>
                            </Flex>
                            <VStack align="start" spacing={2}>
                                <Badge colorScheme="teal">
                                    {formatDate(course.start)} - {formatDate(course.end)}
                                </Badge>
                                <Text as="i">
                                    <Link href={course.website} isExternal>{course.school} <ExternalLinkIcon mx="2px" /></Link>
                                </Text>
                                <Text>{course.description}</Text>
                            </VStack>
                            <Divider my={4} />
                            {course.link && (
                                <Button as={Link} href={course.link} isExternal colorScheme="teal" rightIcon={<ExternalLinkIcon />}>
                                    Allegato
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Aggiorna corso</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleUpdate}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel>Titolo del corso</FormLabel>
                                    <Input name="title" value={formData?.title || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Ente di formazione</FormLabel>
                                    <Input name="school" value={formData?.school || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di inizio</FormLabel>
                                    <Input type="date" name="start" value={formData?.start || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di fine</FormLabel>
                                    <Input type="date" name="end" value={formData?.end || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Descrizione </FormLabel>
                                    <Textarea name="description" value={formData?.description || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link</FormLabel>
                                    <Input name="link" value={formData?.link || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Sito web</FormLabel>
                                    <Input name="website" value={formData?.website || ""} onChange={handleChange} />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" mr={3} type="submit">
                                Salva
                            </Button>
                            <Button onClick={onClose}>Cancella</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default CourseList;
