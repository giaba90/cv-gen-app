import { VStack, Text, Box, Heading, Flex, Button, Link } from '@chakra-ui/react';
import { useReducer, useEffect } from 'react';
import { db } from '../../services/firebase';
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ExternalLinkIcon } from '@chakra-ui/icons';

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

function Projects() {
    const [state, dispatch] = useReducer(reducer, initialState);
  
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
    }, []);

    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#055C80">PROJECTS</Heading>
            {state.projects.map((project, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{project.title}</Text>
                        {project.link && (
                <Button as={Link} href={project.link} isExternal rightIcon={<ExternalLinkIcon />} colorScheme="teal" variant="outline" size="sm">
                  Link al Progetto
                </Button>
              )}
                    </Flex>
                    <Text mt={2}>{project.description}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Projects;