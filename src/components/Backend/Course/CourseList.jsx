import { useEffect, useReducer } from "react";
import { VStack, Text, Heading, Link, Button, IconButton, Input, FormControl,
    FormLabel, Flex, Spinner, useToast, Alert, AlertIcon, Stack,
    List, ListItem, Divider, Textarea,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
    ModalBody, ModalCloseButton, Badge, Container, Box
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { db } from "../../../services/firebase";
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const initialState = {
    courses: [],
    loading: true,
    formData: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_COURSES':
            return { ...state, courses: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
}

const CourseList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                dispatch({ type: 'SET_COURSES', payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
            },
            (err) => {
                console.error("Error fetching courses:", err);
                toast({ title: "Error fetching courses", status: "error", isClosable: true });
                dispatch({ type: 'SET_LOADING', payload: false });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const educationRef = doc(db, "db", "education");
            const coursesCollectionRef = collection(educationRef, "courses");
            
            const formattedData = {
                ...state.formData,
                start: formatDateForFirebase(state.formData.start),
                end: formatDateForFirebase(state.formData.end)
            };

            if (state.formData.id) {
                await updateDoc(doc(coursesCollectionRef, state.formData.id), formattedData);
                toast({ title: "Corso aggiornato con successo", status: "success", isClosable: true });
            } else {
                await addDoc(coursesCollectionRef, formattedData);
                toast({ title: "Corso aggiunto con successo", status: "success", isClosable: true });
            }
            onClose();
        } catch (err) {
            console.error("Errore nel salvare il corso:", err);
            toast({ title: "Errore nel salvare il corso", status: "error", isClosable: true });
        }
    };

    const handleChange = (e) => dispatch({ type: 'SET_FORM_DATA', payload: { ...state.formData, [e.target.name]: e.target.value } });

    const handleEditClick = (course) => {
        dispatch({ type: 'SET_FORM_DATA', payload: course });
        onOpen();
    };

    const formatDateForFirebase = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { month: "short", year: "numeric" });
    };

    if (state.loading) return <Spinner size="xl" />;

    return (
        <Container maxW="container.xl">
            <Box display={{ base: "block", md: "flex" }} justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg" mb={{ base: 2, md: 0 }}>Elenco corsi</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { dispatch({ type: 'SET_FORM_DATA', payload: {} }); onOpen(); }} display={{ base: "block", md: "inline-flex" }}>
                    Aggiungi corso
                </Button>
            </Box>
            {state.courses.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    Nessun corso disponibile nel database.
                </Alert>
            ) : (
                <List mb={4} spacing={6}>
                    {state.courses.map((course) => (
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
                                <Button as={Link} href={course.link} isExternal colorScheme="teal" variant="outline" size="sm" rightIcon={<ExternalLinkIcon />}>
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
                    <ModalHeader>{state.formData.id ? 'Aggiorna corso' : 'Aggiungi corso'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel>Titolo del corso</FormLabel>
                                    <Input name="title" value={state.formData?.title || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Ente di formazione</FormLabel>
                                    <Input name="school" value={state.formData?.school || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di inizio (MM/YYYY)</FormLabel>
                                    <Input type="month" name="start" value={state.formData?.start || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di fine (MM/YYYY)</FormLabel>
                                    <Input type="month" name="end" value={state.formData?.end || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Descrizione </FormLabel>
                                    <Textarea name="description" value={state.formData?.description || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link</FormLabel>
                                    <Input name="link" value={state.formData?.link || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Sito web</FormLabel>
                                    <Input name="website" value={state.formData?.website || ""} onChange={handleChange} />
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
