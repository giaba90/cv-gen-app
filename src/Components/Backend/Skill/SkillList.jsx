import { useEffect, useReducer } from "react";
import { db } from "../../../fbconfig";
import { doc, collection, onSnapshot, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import {
    Box,
    Heading,
    Text,
    Flex,
    HStack,
    Tag,
    TagLabel,
    Spinner,
    Alert,
    AlertIcon,
    Container,
    IconButton,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    useColorModeValue,
    Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";

const initialState = {
    skills: [],
    loading: true,
    error: null,
    editingSkill: null,
    newSkillName: "",
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_SKILLS':
            return { ...state, skills: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_EDITING_SKILL':
            return { ...state, editingSkill: action.payload };
        case 'SET_NEW_SKILL_NAME':
            return { ...state, newSkillName: action.payload };
        case 'DELETE_SKILL':
            return { ...state, skills: state.skills.filter(skill => skill.id !== action.payload) };
        default:
            return state;
    }
}

const SkillList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toast = useToast();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    const { bgColor, borderColor } = useColorModeValue("gray.100", "gray.700");

    useEffect(() => {
        const skillsDocRef = doc(db, "db", "skills");
        const skillCollectionRef = collection(skillsDocRef, "skill");

        const unsubscribe = onSnapshot(
            skillCollectionRef,
            (snapshot) => {
                const skillsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                dispatch({ type: 'SET_SKILLS', payload: skillsData });
            },
            (err) => {
                console.error("Errore durante il recupero delle skill:", err);
                dispatch({ type: 'SET_ERROR', payload: "Errore durante il recupero delle skill" });
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            const skillsDocRef = doc(db, "db", "skills");
            const skillRef = doc(collection(skillsDocRef, "skill"), id);
            await deleteDoc(skillRef);
            dispatch({ type: 'DELETE_SKILL', payload: id });
            toast({
                title: "Skill eliminata",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Errore durante l'eliminazione della skill:", error);
            dispatch({ type: 'SET_ERROR', payload: "Errore durante l'eliminazione della skill" });
            toast({
                title: "Errore durante l'eliminazione",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEdit = (skill) => {
        dispatch({ type: 'SET_EDITING_SKILL', payload: skill });
        onEditOpen();
    };

    const handleUpdate = async () => {
        try {
            const skillsDocRef = doc(db, "db", "skills");
            const skillRef = doc(collection(skillsDocRef, "skill"), state.editingSkill.id);
            await updateDoc(skillRef, { name: state.editingSkill.name });
            onEditClose();
            toast({
                title: "Skill aggiornata",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Errore durante l'aggiornamento della skill:", error);
            toast({
                title: "Errore durante l'aggiornamento",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAddSkill = async () => {
        if (!state.newSkillName.trim()) {
            toast({
                title: "Errore",
                description: "Il nome della skill non può essere vuoto",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const skillsDocRef = doc(db, "db", "skills");
            const skillCollectionRef = collection(skillsDocRef, "skill");
            await addDoc(skillCollectionRef, { name: state.newSkillName });
            dispatch({ type: 'SET_NEW_SKILL_NAME', payload: "" });
            onAddClose();
            toast({
                title: "Skill aggiunta",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Errore durante l'aggiunta della skill:", error);
            toast({
                title: "Errore durante l'aggiunta",
                status: "error",
                duration: 3000,
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
        <Container maxW="container.xl" >
            <Flex justifyContent="space-between" alignItems="center" mt={4} mb={4}>
                <Heading size="lg"> Elenco delle Skill</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} >
                    Aggiungi Skill
                </Button>
            </Flex>
            {state.skills.length === 0 ? (
                <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
                    <AlertIcon boxSize="40px" mr={0} />
                    <Text mt={4} mb={1} fontSize="lg">
                        Nessuna skill presente nel database
                    </Text>
                    <Text fontSize="md">Inizia aggiungendo una nuova skill!</Text>
                </Alert>
            ) : (
                <HStack spacing={4} flexWrap="wrap" bg={bgColor} borderColor={borderColor} borderWidth={1} boxShadow="md" p={4} borderRadius="md">
                    {state.skills.map((skill) => (
                        <Box key={skill.id}>
                            <Tag
                                size="lg"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="teal"
                            >
                                <TagLabel>{skill.name}</TagLabel>
                            </Tag>                
                            <IconButton
                                size="xs"
                                ml={2}
                                icon={<EditIcon />}
                                onClick={() => handleEdit(skill)}
                                aria-label="Edit skill"
                            />
                            <IconButton
                                size="xs"
                                ml={2}
                                icon={<DeleteIcon />}
                                onClick={() => handleDelete(skill.id)}
                                aria-label="Delete skill"
                            />
                        </Box>
                    ))}
                </HStack>
            )}

            <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifica Skill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nome Skill</FormLabel>
                            <Input
                                value={state.editingSkill?.name || ""}
                                onChange={(e) =>
                                    dispatch({ type: 'SET_EDITING_SKILL', payload: { ...state.editingSkill, name: e.target.value } })
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                            Salva
                        </Button>
                        <Button onClick={onEditClose}>Annulla</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isAddOpen} onClose={onAddClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Aggiungi Skill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nome Skill</FormLabel>
                            <Input
                                value={state.newSkillName}
                                onChange={(e) => dispatch({ type: 'SET_NEW_SKILL_NAME', payload: e.target.value })}
                                placeholder="Inserisci il nome della nuova skill"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddSkill}>
                            Aggiungi
                        </Button>
                        <Button onClick={onAddClose}>Annulla</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default SkillList;
