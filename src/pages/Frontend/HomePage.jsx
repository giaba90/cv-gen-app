import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Image,
  Button,
  Grid,
  GridItem,
  Link,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Icon,
  useColorModeValue, UnorderedList, ListItem
} from "@chakra-ui/react"
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa"

export default function Component() {
  const bgColor = useColorModeValue("gray.100", "gray.900")
  const primaryColor = useColorModeValue("blue.500", "blue.300")

  return (
    <Box minH="100vh" bg={bgColor}>
      <Flex>
        {/* Sidebar */}
        <Box w="64" bg={primaryColor} color="white" p={6} display={{ base: "none", lg: "block" }}>
          <VStack spacing={4} position="sticky" top={6}>
            <Avatar size="2xl" src="/placeholder.svg?height=128&width=128" />
            <Heading size="md" textAlign="center">John Doe</Heading>
            <Text textAlign="center">Senior Web Developer</Text>
            <VStack spacing={2} align="flex-start" w="full">
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} mr={2} />
                <Text fontSize="sm">New York, NY</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaEnvelope} mr={2} />
                <Link href="mailto:john.doe@example.com" fontSize="sm">john.doe@example.com</Link>
              </Flex>
              <Flex align="center">
                <Icon as={FaPhone} mr={2} />
                <Link href="tel:+1234567890" fontSize="sm">+1 (234) 567-890</Link>
              </Flex>
              <Flex align="center">
                <Icon as={FaLinkedin} mr={2} />
                <Link href="https://www.linkedin.com/in/johndoe" isExternal fontSize="sm">linkedin.com/in/johndoe</Link>
              </Flex>
              <Flex align="center">
                <Icon as={FaGithub} mr={2} />
                <Link href="https://github.com/johndoe" isExternal fontSize="sm">github.com/johndoe</Link>
              </Flex>
            </VStack>
            <Button leftIcon={<DownloadIcon />} colorScheme="whiteAlpha" variant="solid" w="full">
              Download CV
            </Button>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={6} lg={10}>
          <Container maxW="container.xl">
            <VStack spacing={12} align="stretch">
              {/* Profile Section */}
              <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Bio
                </Heading>
                  <Box>
                    <Text fontSize="lg" mb={4}>
                      I'm a passionate senior web developer with 5+ years of experience in creating responsive and user-friendly web applications. I specialize in React, Node.js, and modern web technologies, always striving to deliver high-quality, scalable solutions.
                    </Text>
                  </Box>
                </Box>

             

              {/* Experience Section */}
              <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Experience
                </Heading>
                <VStack spacing={6} align="stretch">
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">Senior Web Developer</Heading>
                        <Badge colorScheme="blue">2020 - Present</Badge>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text fontWeight="bold" mb={2}>TechCorp Inc.</Text>
                      <UnorderedList spacing={1}>
                        <ListItem>Led a team of 5 developers in creating a large-scale e-commerce platform</ListItem>
                        <ListItem>Implemented CI/CD pipelines, reducing deployment time by 50%</ListItem>
                        <ListItem>Optimized website performance, improving load times by 30%</ListItem>
                      </UnorderedList>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">Web Developer</Heading>
                        <Badge colorScheme="blue">2018 - 2020</Badge>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text fontWeight="bold" mb={2}>WebSolutions Co.</Text>
                      <UnorderedList spacing={1}>
                        <ListItem>Developed and maintained client websites using React and Node.js</ListItem>
                        <ListItem>Collaborated with designers to implement responsive designs</ListItem>
                        <ListItem>Integrated third-party APIs and services into web applications</ListItem>
                      </UnorderedList>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>

              {/* Education Section */}
              <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Education
                </Heading>
                <Card>
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Bachelor of Science in Computer Science</Heading>
                      <Badge colorScheme="blue">2014 - 2018</Badge>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text fontWeight="bold">University of Technology</Text>
                  </CardBody>
                </Card>
              </Box>
 {/* Skills Section */}
 <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Skills
                </Heading>
                <Flex flexWrap="wrap" gap={2}>
                  {["JavaScript", "TypeScript", "React", "Node.js", "Express", "GraphQL", "MongoDB", "SQL", "Git", "Docker", "AWS", "CI/CD", "Agile Methodologies", "RESTful APIs", "Test-Driven Development"].map((skill) => (
                    <Badge key={skill} px={2} py={1} borderRadius="full" colorScheme="blue">
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>
              {/* Projects Section */}
              <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Projects
                </Heading>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">E-commerce Platform</Heading>
                        <Link href="#" isExternal>
                          <ExternalLinkIcon />
                        </Link>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text mb={2}>A full-stack e-commerce solution with React, Node.js, and MongoDB.</Text>
                      <Flex flexWrap="wrap" gap={2}>
                        <Badge>React</Badge>
                        <Badge>Node.js</Badge>
                        <Badge>MongoDB</Badge>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">Task Management App</Heading>
                        <Link href="#" isExternal>
                          <ExternalLinkIcon />
                        </Link>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text mb={2}>A responsive task management application with real-time updates.</Text>
                      <Flex flexWrap="wrap" gap={2}>
                        <Badge>React</Badge>
                        <Badge>Firebase</Badge>
                        <Badge>Material-UI</Badge>
                      </Flex>
                    </CardBody>
                  </Card>
                </Grid>
              </Box>

              {/* Testimonials Section */}
              <Box>
                <Heading size="xl" mb={4}>
                  <Text as="span" bg={primaryColor} color="white" px={2} mr={2} borderRadius="md">#</Text>
                  Testimonials
                </Heading>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <Card>
                    <CardBody>
                      <Text fontStyle="italic" mb={4}>
                        "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding."
                      </Text>
                      <Flex align="center">
                        <Avatar size="sm" src="/placeholder.svg?height=40&width=40" mr={4} />
                        <Box>
                          <Text fontWeight="bold">Sarah Johnson</Text>
                          <Text fontSize="sm" color="gray.500">Project Manager at TechCorp Inc.</Text>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <Text fontStyle="italic" mb={4}>
                        "Working with John was a pleasure. He's not only technically proficient but also a great communicator and team player."
                      </Text>
                      <Flex align="center">
                        <Avatar size="sm" src="/placeholder.svg?height=40&width=40" mr={4} />
                        <Box>
                          <Text fontWeight="bold">Mike Chen</Text>
                          <Text fontSize="sm" color="gray.500">CTO at WebSolutions Co.</Text>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                </Grid>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}