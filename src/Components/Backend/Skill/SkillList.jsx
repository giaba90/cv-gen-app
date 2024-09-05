import { useState, useEffect } from 'react';
import { db } from "../../../fbconfig";
import { doc, collection, onSnapshot } from 'firebase/firestore';
import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
  Container,
} from '@chakra-ui/react';

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const skillsDocRef = doc(db, 'db', 'skills');
    const skillCollectionRef = collection(skillsDocRef, 'skill');

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
        console.error('Errore durante il recupero delle skill:', err);
        setError('Errore durante il recupero delle skill');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Elenco delle Skill
        </Heading>
        {skills.length === 0 ? (
          <Text textAlign="center">Nessuna skill disponibile.</Text>
        ) : (
          <List spacing={3}>
            {skills.map((skill) => (
              <ListItem key={skill.id} p={3} borderWidth={1} borderRadius="md">
                <Text fontWeight="medium">{skill.name}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default SkillList;
