import { useState, useEffect } from 'react';
import {
  Box, VStack, Text, List, ListItem, Heading, Link, IconButton, Input,
  Button, Flex, useToast, Spinner, Alert, AlertIcon, Textarea,
  FormControl, FormLabel, Stack, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Container, Tooltip, useColorModeValue
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { db } from '../../../fbconfig';
import { collection, doc, query, orderBy, onSnapshot, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
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
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching projects:', err);
        toast({ title: 'Error fetching projects', status: 'error', isClosable: true });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'db', 'Projects', 'project', id));
      toast({ title: 'Project deleted successfully', status: 'success', isClosable: true });
    } catch (err) {
      console.error('Error deleting project:', err);
      toast({ title: 'Error deleting project', status: 'error', isClosable: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateDoc(doc(db, 'db', 'Projects', 'project', formData.id), formData);
        toast({ title: 'Project updated successfully', status: 'success', isClosable: true });
      } else {
        await addDoc(collection(db, 'db', 'Projects', 'project'), { ...formData, createdAt: new Date() });
        toast({ title: 'Project added successfully', status: 'success', isClosable: true });
      }
      onClose();
      setFormData({});
    } catch (err) {
      console.error('Error saving project:', err);
      toast({ title: 'Error saving project', status: 'error', isClosable: true });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const openEditModal = (project) => {
    setFormData(project);
    onOpen();
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="xl">Projects</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
          Add Project
        </Button>
      </Flex>

      {projects.length === 0 ? (
        <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <Text mt={4} mb={1} fontSize="lg">
            No projects available.
          </Text>
          <Text fontSize="md">Start by adding a new project!</Text>
        </Alert>
      ) : (
        <List spacing={6}>
          {projects.map((project) => (
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
                <Button as={Link} href={project.link} isExternal rightIcon={<ExternalLinkIcon />} colorScheme="blue" variant="outline" size="sm">
                  View Project
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formData.id ? 'Edit Project' : 'Add Project'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" value={formData.title || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="description" value={formData.description || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Link</FormLabel>
                  <Input name="link" value={formData.link || ''} onChange={handleChange} />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ProjectList;