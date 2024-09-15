import { VStack, Box, Heading, Spinner, Tag } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../fbconfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function Skills() {
  const fetchSkills = async () => {
    const skillsDocRef = doc(db, "db", "skills");
    const skillsRef = collection(skillsDocRef, "skill");
    const q = query(skillsRef, orderBy('level', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const { data: skills, isLoading, error } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Tag colorScheme="red">Error loading skills: {error.message}</Tag>;

  return (
    <VStack align="start" spacing={4} mb={8}>
      <Heading as="h2" size="lg">SKILLS</Heading>
      {skills && skills.map((skill) => (
        <Box key={skill.id} width="100%">
          <Tag size="lg" variant="subtle" colorScheme="blue" width="100%">
            {skill.name}
          </Tag>
        </Box>
      ))}
    </VStack>
  );
}

export default Skills;