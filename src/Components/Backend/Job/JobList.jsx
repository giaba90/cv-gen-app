import { useEffect, useReducer } from "react";
import {
    Box, VStack, Text, Heading, Link, Button, IconButton, Input, FormControl,
    FormLabel, Flex, Spinner, useToast, Alert, AlertIcon, Stack, Textarea,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, List, ListItem, Badge, Container
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig";
import { collection, doc, query, orderBy, onSnapshot, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const initialState = {
    jobs: [],
    loading: true,
    formData: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_JOBS':
            return { ...state, jobs: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
}

const JobList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const experienceRef = doc(db, "db", "experience");
        const jobsCollectionRef = collection(experienceRef, "jobs");
        const q = query(jobsCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                dispatch({ type: 'SET_JOBS', payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
            },
            (err) => {
                console.error("Error fetching jobs:", err);
                toast({ title: "Error fetching jobs", status: "error", isClosable: true });
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        );

        return () => unsubscribe();
    }, [toast]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "db", "experience", "jobs", id));
            toast({ title: "Job deleted successfully", status: "success", isClosable: true });
        } catch (err) {
            console.error("Error deleting job:", err);
            toast({ title: "Error deleting job", status: "error", isClosable: true });
        }
    };

    const formatDateForFirebase = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...state.formData,
                start: formatDateForFirebase(state.formData.start),
                end: formatDateForFirebase(state.formData.end)
            };

            if (state.formData.id) {
                await updateDoc(doc(db, "db", "experience", "jobs", state.formData.id), formattedData);
                toast({ title: "Esperienza aggiornata con successo", status: "success", isClosable: true });
            } else {
                await addDoc(collection(db, "db", "experience", "jobs"), { ...formattedData, createdAt: new Date() });
                toast({ title: "Esperienza aggiunta con successo!", status: "success", isClosable: true });
            }
            onClose();
            dispatch({ type: 'SET_FORM_DATA', payload: {} });
        } catch (err) {
            console.error("Errore nel salvataggio dell'esperienza:", err);
            toast({ title: "Errore nel salvataggio dell'esperienza", status: "error", isClosable: true });
        }
    };

    const handleChange = (e) => dispatch({ type: 'SET_FORM_DATA', payload: { ...state.formData, [e.target.name]: e.target.value } });

    const openEditModal = (job) => {
        dispatch({ type: 'SET_FORM_DATA', payload: job });
        onOpen();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { month: "2-digit", year: "numeric" });
    };

    if (state.loading) return <Spinner size="xl" />;

    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Elenco esperienze lavorative</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { dispatch({ type: 'SET_FORM_DATA', payload: {} }); onOpen(); }}>
                    Aggiungi esperienza
                </Button>
            </Flex>

            {state.jobs.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    Nessuna esperienza disponibile nel database.
                </Alert>
            ) : (
                <List mb={4} spacing={4}>
                    {state.jobs.map((job) => (
                        <ListItem key={job.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                            <Flex justifyContent="space-between" alignItems="flex-start">
                                <VStack align="start" spacing={1}>
                                    <Badge colorScheme="teal">
                                        {formatDate(job.start)} - {formatDate(job.end)}
                                    </Badge>
                                    <Heading size="md">{job.title}</Heading>
                                    <Text as="i">
                                        <Link href={job.website} isExternal>{job.company}</Link>
                                    </Text>
                                    <Text>{job.description}</Text>
                                </VStack>
                                <Stack direction="row">
                                    <IconButton icon={<EditIcon />} onClick={() => openEditModal(job)} aria-label="Edit job" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(job.id)} aria-label="Delete job" />
                                </Stack>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{state.formData.id ? 'Modifica esperienza' : 'Aggiungi esperienza'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Ruolo ricoperto</FormLabel>
                                    <Input name="title" value={state.formData.title || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Azienda</FormLabel>
                                    <Input name="company" value={state.formData.company || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Data di inizio</FormLabel>
                                    <Input type="month" name="start" value={state.formData.start || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di fine</FormLabel>
                                    <Input type="month" name="end" value={state.formData.end || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Descrizione</FormLabel>
                                    <Textarea name="description" value={state.formData.description || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Sito web aziendale</FormLabel>
                                    <Input name="website" value={state.formData.website || ''} onChange={handleChange} />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="teal" mr={3}>
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

export default JobList;
