import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    List,
    ListItem,
    Spinner,
    Text,
    VStack,
    HStack,
    Link,
    FormControl,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig"; // Importa il db configurato
import {
    doc,
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingJobId, setEditingJobId] = useState(null); // Stato per gestire la modifica del lavoro
    const [formData, setFormData] = useState({}); // Stato per i dati del lavoro da modificare

    useEffect(() => {
        const experienceRef = doc(db, "db", "experience");
        const jobsCollectionRef = collection(experienceRef, "jobs");
        const q = query(jobsCollectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const jobsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setJobs(jobsData);
                setLoading(false);
            },
            (err) => {
                console.error("Errore durante il recupero dei lavori:", err);
                setError("Errore durante il recupero dei lavori");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            const experienceRef = doc(db, "db", "experience");
            const JobDocRef = doc(experienceRef, "jobs", id);
            await deleteDoc(JobDocRef);
            console.log("Lavoro eliminato con successo!");
        } catch (err) {
            console.error("Errore durante l'eliminazione del lavoro:", err);
            setError("Errore durante l'eliminazione del lavoro");
        }
    };

    const handleEditClick = (Job) => {
        setEditingJobId(Job.id); // Imposta lo stato per identificare il lavoro in modifica
        setFormData(Job); // Imposta i dati correnti del lavoro nel modulo di modifica
    };

    const handleSaveClick = async () => {
        try {
            const experienceRef = doc(db, "db", "experience");
            const JobDocRef = doc(experienceRef, "jobs", editingJobId);
            await updateDoc(JobDocRef, formData);
            console.log("Lavoro aggiornato con successo!");
            setEditingJobId(null); // Disattiva la modalità di modifica
            setFormData({}); // Resetta i dati del modulo
        } catch (err) {
            console.error("Errore durante l'aggiornamento del lavoro:", err);
            setError("Errore durante l'aggiornamento del lavoro");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return <Spinner size="xl" label="Caricamento in corso..." />;
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    return (
        <Box>
            {jobs.length === 0 ? (
                <Text>Nessun lavoro disponibile.</Text>
            ) : (
                <List spacing={3}>
                    {jobs.map((Job) => (
                        <ListItem key={Job.id}>
                            <Box>
                                {editingJobId === Job.id ? (
                                    <>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                name="title"
                                                value={formData.title || ""}
                                                onChange={handleChange}
                                                placeholder="Titolo del lavoro"
                                                mb={2}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                name="company"
                                                value={formData.company || ""}
                                                onChange={handleChange}
                                                placeholder="Nome della società"
                                                mb={2}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                name="start"
                                                value={formData.start || ""}
                                                onChange={handleChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                name="end"
                                                value={formData.end || ""}
                                                onChange={handleChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                name="description"
                                                value={formData.description || ""}
                                                onChange={handleChange}
                                                placeholder="Descrizione"
                                                mb={2}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                name="website"
                                                value={formData.website || ""}
                                                onChange={handleChange}
                                                placeholder="Sito web"
                                                mb={2}
                                            />
                                        </FormControl>
                                        <HStack spacing={3} mt={2}>
                                            <Button
                                                leftIcon={<CheckIcon />}
                                                colorScheme="teal"
                                                onClick={handleSaveClick}
                                            >
                                                Salva
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setEditingJobId(null)}
                                            >
                                                Annulla
                                            </Button>
                                        </HStack>
                                    </>
                                ) : (
                                    <>
                                        <Flex borderTop="1px" borderColor="teal" pt={4} flexDirection="column">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                <HStack>
                                                    <Text fontWeight="bold" fontSize="md" color="teal">
                                                        {formatDate(Job.start)} - {formatDate(Job.end)}
                                                    </Text>
                                                    <Text fontWeight="bold" fontSize="lg">
                                                        {Job.title}
                                                    </Text>
                                                </HStack>
                                                <HStack>
                                                    <Button onClick={() => handleEditClick(Job)}>
                                                        <EditIcon />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(Job.id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </HStack>
                                            </Box>

                                            <VStack align="start">
                                                <Text as="i">
                                                    <Link href={Job.website}>{Job.company}</Link>
                                                </Text>

                                                <Text align="left" pt={2} pb={2}>
                                                    {Job.description}
                                                </Text>

                                            </VStack>
                                        </Flex>
                                    </>
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default JobList;
