import { VStack, Text, Progress, Box } from '@chakra-ui/react';

const skills = [
  { name: 'PHP OOPs', level: 100 },
  { name: 'Yii 2 MVC', level: 90 },
  { name: 'PHPUnit', level: 100 },
  { name: 'JavaScript', level: 85 },
  { name: 'Node.js', level: 95 },
  { name: 'JavaSE Opp\'s', level: 100 },
  { name: 'C#, C++', level: 80 },
  { name: 'MySQL, SQL Server', level: 100 },
  { name: 'Transact SQL', level: 100 },
  { name: 'Json, Rest API', level: 85 },
  { name: 'SW Pattern', level: 100 },
  { name: 'Git', level: 90 },
];

function Skills() {
  return (
    <VStack align="start" spacing={4} mb={8}>
      <Text fontWeight="bold" fontSize="xl">SKILLS</Text>
      {skills.map((skill, index) => (
        <Box key={index} width="100%">
          <Text mb={1}>{skill.name}</Text>
          <Progress value={skill.level} size="sm" colorScheme="blue" />
        </Box>
      ))}
    </VStack>
  );
}

export default Skills;