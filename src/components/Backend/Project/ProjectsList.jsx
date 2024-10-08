import { useEffect, useReducer } from 'react';
import {
  Box, VStack, Text, List, ListItem, Heading, Link, IconButton, Input,
  Button, Flex, useToast, Spinner, Alert, AlertIcon, Textarea,
  FormControl, FormLabel, Stack, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Container, Tooltip, useColorModeValue
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { db } from '../../../services/firebase';
import { collection, doc, query, orderBy, onSnapshot, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

const initialState = {
  projects: [],
  loading: true,
  formData: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FORM_DATA':
      return { ...state, formData: action.payload };
    default:
      return state;
  }
}

const ProjectList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const projectRef = doc(db, 'db', 'Projects');
    const projectCollectionRef = collection(projectRef, 'project');
    const q = query(projectCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        dispatch({ type: 'SET_PROJECTS', payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
      },
      (err) => {
        console.error('Errore durante il recupero dei progetti:', err);
        toast({ title: 'Errore durante il recupero dei progetti', status: 'error', isClosable: true });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'db', 'Projects', 'project', id));
      toast({ title: 'Progetto eliminato con successo', status: 'success', isClosable: true });
    } catch (err) {
      console.error('Errore durante l\'eliminazione del progetto:', err);
      toast({ title: 'Errore durante l\'eliminazione del progetto', status: 'error', isClosable: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.formData.id) {
        await updateDoc(doc(db, 'db', 'Projects', 'project', state.formData.id), state.formData);
        toast({ title: 'Progetto aggiornato con successo', status: 'success', isClosable: true });
      } else {
        await addDoc(collection(db, 'db', 'Projects', 'project'), { ...state.formData, createdAt: new Date() });
        toast({ title: 'Progetto aggiunto con successo', status: 'success', isClosable: true });
      }
      onClose();
      dispatch({ type: 'SET_FORM_DATA', payload: {} });
    } catch (err) {
      console.error('Errore nel salvataggio del progetto:', err);
      toast({ title: 'Errore nel salvataggio del progetto', status: 'error', isClosable: true });
    }
  };

  const handleChange = (e) => dispatch({ type: 'SET_FORM_DATA', payload: { ...state.formData, [e.target.name]: e.target.value } });

  const openEditModal = (project) => {
    dispatch({ type: 'SET_FORM_DATA', payload: project });
    onOpen();
  };

  if (state.loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Container maxW="container.xl">
      <Box display={{ base: "block", md: "flex" }} justifyContent="space-between" alignItems="center" mt={4} mb={4}>
        <Heading size="lg" mb={{ base: 2, md: 0 }}>Elenco progetti</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { dispatch({ type: 'SET_FORM_DATA', payload: {} }); onOpen(); }} display={{ base: "block", md: "inline-flex" }}>
          Aggiungi progetto
        </Button>
      </Box>

      {state.projects.length === 0 ? (
        <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <Text mt={4} mb={1} fontSize="lg">
            Nessun progetto presente nel database
          </Text>
          <Text fontSize="md">Inizia aggiungendo un nuovo progetto!</Text>
        </Alert>
      ) : (
        <List spacing={6}>
          {state.projects.map((project) => (
            <ListItem key={project.id} bg={bgColor} borderColor={borderColor} borderWidth={1} boxShadow="md" p={4} borderRadius="md">
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Heading size="md">{project.title}</Heading>
                <Stack direction="row">
                  <Tooltip label="Edit project">
                    <IconButton icon={<EditIcon />} aria-label="Edit project" onClick={() => openEditModal(project)} size="sm" />
                  </Tooltip>
                  <Tooltip label="Delete project">
                    <IconButton icon={<DeleteIcon />} aria-label="Delete project" onClick={() => handleDelete(project.id)} size="sm" />
                  </Tooltip>
                </Stack>
              </Flex>
              <Text mb={4}>{project.description}</Text>
              {project.link && (
                <Button as={Link} href={project.link} isExternal rightIcon={<ExternalLinkIcon />} colorScheme="teal" variant="outline" size="sm">
                  Link al Progetto
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{state.formData.id ? 'Modifica progetto' : 'Nuovo progetto'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Titolo</FormLabel>
                  <Input name="title" value={state.formData.title || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Descrizione</FormLabel>
                  <Textarea name="description" value={state.formData.description || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Link</FormLabel>
                  <Input name="link" value={state.formData.link || ''} onChange={handleChange} />
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

export default ProjectList;