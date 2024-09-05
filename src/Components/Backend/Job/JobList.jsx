import { useState, useEffect } from "react";
import {
    Box, VStack, Text, Heading, Link, Button, IconButton, Input, FormControl,
    FormLabel, Flex, Spinner, useToast, Alert, AlertIcon, Stack, Textarea,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, List, ListItem, Badge, Container
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig";
import { collection, doc, query, orderBy, onSnapshot, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const experienceRef = doc(db, "db", "experience");
        const jobsCollectionRef = collection(experienceRef, "jobs");
        const q = query(jobsCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching jobs:", err);
                toast({ title: "Error fetching jobs", status: "error", isClosable: true });
                setLoading(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await updateDoc(doc(db, "db", "experience", "jobs", formData.id), formData);
                toast({ title: "Esperienza aggiornata con successo", status: "success", isClosable: true });
            } else {
                await addDoc(collection(db, "db", "experience", "jobs"), { ...formData, createdAt: new Date() });
                toast({ title: "Esperienza aggiunta con successo!", status: "success", isClosable: true });
            }
            onClose();
            setFormData({});
        } catch (err) {
            console.error("Errore nel savaltaggio dell'esperienza:", err);
            toast({ title: "Errore nel savaltaggio dell'esperienza", status: "error", isClosable: true });
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const openEditModal = (job) => {
        setFormData(job);
        onOpen();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    if (loading) return <Spinner size="xl" />;

    return (
        <Container maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Elenco esperienze lavorative</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
                    Aggiungi esperienza
                </Button>
            </Flex>

            {jobs.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    Nessuna esprienza disponibile nel database.
                </Alert>
            ) : (
                <List spacing={4}>
                    {jobs.map((job) => (
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
                    <ModalHeader>{formData.id ? 'Modifica esperienza' : 'Aggiungi esperienza'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Ruolo ricoperto</FormLabel>
                                    <Input name="title" value={formData.title || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Azienda</FormLabel>
                                    <Input name="company" value={formData.company || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Data di inizio</FormLabel>
                                    <Input type="date" name="start" value={formData.start || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data di fine</FormLabel>
                                    <Input type="date" name="end" value={formData.end || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Descrizione</FormLabel>
                                    <Textarea name="description" value={formData.description || ''} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Sito web aziendale</FormLabel>
                                    <Input name="website" value={formData.website || ''} onChange={handleChange} />
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
