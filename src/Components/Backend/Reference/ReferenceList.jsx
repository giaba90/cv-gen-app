import { useEffect, useReducer } from "react";
import { db, storage } from "../../../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    onSnapshot,
    deleteDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import {
    Box,
    SimpleGrid,
    VStack,
    Tooltip,
    Stack,
    Card,
    CardBody,
    Text,
    Heading,
    IconButton,
    Input,
    Button,
    Flex,
    useToast,
    Spinner,
    Alert,
    AlertIcon,
    Textarea,
    FormControl,
    FormLabel,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Container,
    Image, useColorModeValue,
    Progress
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

const initialState = {
    references: [],
    formData: {},
    loading: true,
    error: null,
    uploading: false,
    uploadProgress: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_REFERENCES':
            return { ...state, references: action.payload, loading: false };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_UPLOADING':
            return { ...state, uploading: action.payload };
        case 'SET_UPLOAD_PROGRESS':
            return { ...state, uploadProgress: action.payload };
        default:
            return state;
    }
}

const ReferenceList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgColor = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    useEffect(() => {
        const referenceRef = doc(db, "db", "reference");
        const refCollectionRef = collection(referenceRef, "ref");

        const unsubscribe = onSnapshot(
            refCollectionRef,
            (snapshot) => {
                dispatch({
                    type: 'SET_REFERENCES',
                    payload: snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                });
            },
            (err) => {
                console.error("Errore durante il recupero delle recensioni:", err);
                toast({
                    title: "Errore durante il recupero delle recensioni",
                    status: "error",
                    isClosable: true,
                });
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        );

        return () => unsubscribe();
    }, [toast]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        dispatch({
            type: 'SET_FORM_DATA',
            payload: {
                ...state.formData,
                [name]: files ? files[0] : value,
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_UPLOADING', payload: true });

        try {
            let photoURL = state.formData.photo ? await uploadPhoto(state.formData.photo) : "";

            const referenceData = {
                job_title: state.formData.job_title,
                description: state.formData.description,
                name: state.formData.name,
                photo: photoURL,
            };

            const referenceRef = doc(db, "db", "reference");
            const refCollectionRef = collection(referenceRef, "ref");

            if (state.formData.id) {
                await updateDoc(doc(refCollectionRef, state.formData.id), referenceData);
                toast({
                    title: "Successo",
                    description: "Recensione aggiornata con successo!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                await addDoc(refCollectionRef, referenceData);
                toast({
                    title: "Successo",
                    description: "Recensione caricata con successo!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }

            dispatch({ type: 'SET_FORM_DATA', payload: { job_title: "", description: "", name: "", photo: null } });
            onClose();
        } catch (err) {
            console.error("Errore durante il caricamento/aggiornamento dei dati:", err);
            toast({
                title: "Errore",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            dispatch({ type: 'SET_UPLOADING', payload: false });
            dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 0 });
        }
    };

    const uploadPhoto = async (photo) => {
        const photoRef = ref(storage, `photos/${photo.name}`);
        const uploadTask = uploadBytesResumable(photoRef, photo);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress });
                },
                (error) => {
                    reject(new Error(`Errore durante il caricamento dell'immagine: ${error.message}`));
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    const openEditModal = (ref) => {
        dispatch({ type: 'SET_FORM_DATA', payload: ref });
        onOpen();
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "db", "reference", "ref", id));
            toast({
                title: "Successo",
                description: "Recensione eliminata con successo!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error("Errore durante l'eliminazione della recensione:", err);
            toast({
                title: "Errore",
                description: "Errore durante l'eliminazione della recensione",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (state.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (state.error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {state.error}
            </Alert>
        );
    }

    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg">Elenco recensioni</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { dispatch({ type: 'SET_FORM_DATA', payload: {} }); onOpen(); }} >
                    Aggiungi recensione
                </Button>
            </Flex>
            {state.references.length === 0 ? (
                <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
                    <AlertIcon boxSize="40px" mr={0} />
                    <Text mt={4} mb={1} fontSize="lg">
                        Nessuna recensione presente nel database
                    </Text>
                    <Text fontSize="md">Inizia aggiungendo una nuova recensione!</Text>
                </Alert>
            ) : (
                <SimpleGrid columns={3} spacing={6} mb={4} width="100%">
                    {state.references.map((ref) => (
                        <Card key={ref.id} bg={bgColor} borderColor={borderColor} borderWidth={1} boxShadow="md" p={4} borderRadius="md">
                            <CardBody>
                                <Flex direction="column" height="100%">
                                    <Flex justifyContent="space-between" alignItems="flex-start" mb={3}>
                                        <VStack align="start" spacing={2}>
                                            {ref.photo && (
                                                <Image src={ref.photo} alt={ref.name} boxSize='100px' objectFit='cover' borderRadius='md' />
                                            )}
                                            <Heading size="md">{ref.name}</Heading>
                                            <Text as="i">{ref.job_title}</Text>
                                        </VStack>
                                        
                                    </Flex>
                                    <Text flex={1}>{ref.description}</Text>
                                    <Stack direction="row">
                                            <Tooltip label="Edit ref">
                                                <IconButton icon={<EditIcon />} aria-label="Edit ref" onClick={() => openEditModal(ref)} size="sm" />
                                            </Tooltip>
                                            <Tooltip label="Delete ref">
                                                <IconButton icon={<DeleteIcon />} aria-label="Delete ref" onClick={() => handleDelete(ref.id)} size="sm" />
                                            </Tooltip>
                                        </Stack>
                                </Flex>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{state.formData.id ? "Modifica recensione" : "Nuova recensione"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Nome del cliente</FormLabel>
                                    <Input
                                        name="name"
                                        value={state.formData.name || ""}
                                        onChange={handleChange}
                                        placeholder="Inserisci il nome del cliente"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Qualifica del cliente</FormLabel>
                                    <Input
                                        name="job_title"
                                        value={state.formData.job_title || ""}
                                        onChange={handleChange}
                                        placeholder="Inserisci la qualifica del cliente"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Testo recensione</FormLabel>
                                    <Textarea
                                        name="description"
                                        value={state.formData.description || ""}
                                        onChange={handleChange}
                                        placeholder="Inserisci il testo della recensione"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Foto</FormLabel>
                                    <Input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                {state.uploadProgress > 0 && (
                                    <Progress value={state.uploadProgress} width="100%" />
                                )}
                            </VStack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={state.uploading}
                            loadingText="Caricamento in corso..."
                            onClick={handleSubmit}
                            mr={3}
                        >
                            {state.formData.id ? "Aggiorna" : "Carica"} Recensione
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Annulla
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default ReferenceList;
