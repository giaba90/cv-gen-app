import { VStack, Heading, Tag, TagLabel, HStack } from '@chakra-ui/react';
import { useEffect, useReducer } from "react";
import { db } from "../../services/firebase";
import { doc, collection, onSnapshot   } from "firebase/firestore";

const initialState = {
  skills: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_SKILLS':
      return { ...state, skills: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
  }
  return state;
}

function Skills() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        dispatch({ type: 'GET_SKILLS', payload: skillsData });
      },
      (err) => {
        console.error("Errore durante il recupero delle skill:", err);
        dispatch({ type: 'SET_ERROR', payload: "Errore durante il recupero delle skill" }); 
      }
    );

    return () => unsubscribe();
  }, []);

  const { skills, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VStack align="start" spacing={4} mb={8}>
      <Heading as="h2" size="lg">SKILLS</Heading>
      <HStack>
      {skills.map((skill, index) => (
        <Tag size="md" key={skill.id} variant="solid" colorScheme="blue" mb={1}>
          <TagLabel>{skill.name}</TagLabel>
        </Tag>
      ))}
      </HStack>
    </VStack>
  );
}

export default Skills;