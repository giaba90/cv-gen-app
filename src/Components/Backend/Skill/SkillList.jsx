import { useState, useEffect } from "react";
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

const SkillList = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [newSkillName, setNewSkillName] = useState("");
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
                setSkills(skillsData);
                setLoading(false);
            },
            (err) => {
                console.error("Errore durante il recupero delle skill:", err);
                setError("Errore durante il recupero delle skill");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            const skillsDocRef = doc(db, "db", "skills");
            const skillRef = doc(collection(skillsDocRef, "skill"), id);
            await deleteDoc(skillRef);
            toast({
                title: "Skill eliminata",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Errore durante l'eliminazione della skill:", error);
            toast({
                title: "Errore durante l'eliminazione",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        onEditOpen();
    };

    const handleUpdate = async () => {
        try {
            const skillsDocRef = doc(db, "db", "skills");
            const skillRef = doc(collection(skillsDocRef, "skill"), editingSkill.id);
            await updateDoc(skillRef, { name: editingSkill.name });
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
        if (!newSkillName.trim()) {
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
            await addDoc(skillCollectionRef, { name: newSkillName });
            setNewSkillName("");
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    return (
        <Container maxW="container.xl" >
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="xl"> Elenco delle Skill</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} >
                    Aggiungi Skill
                </Button>
            </Flex>
            {skills.length === 0 ? (
                <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
                    <AlertIcon boxSize="40px" mr={0} />
                    <Text mt={4} mb={1} fontSize="lg">
                        Nessuna skill presente nel database
                    </Text>
                    <Text fontSize="md">Inizia aggiungendo una nuova skill!</Text>
                </Alert>
            ) : (
                <HStack spacing={4} flexWrap="wrap" bg={bgColor} borderColor={borderColor} borderWidth={1} boxShadow="md" p={4} borderRadius="md">
                    {skills.map((skill) => (
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
                                value={editingSkill?.name || ""}
                                onChange={(e) =>
                                    setEditingSkill({ ...editingSkill, name: e.target.value })
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
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
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
