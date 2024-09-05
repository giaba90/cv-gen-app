import { useState, useEffect } from "react";
import {
    Box, VStack, Text, Heading, Link, Button, IconButton, Input, FormControl,
    FormLabel, Flex, Spinner, useToast, Alert, AlertIcon, Stack,
    List, ListItem, Divider, Textarea,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Badge
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig";
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching courses:", err);
                toast({ title: "Error fetching courses", status: "error", isClosable: true });
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [toast]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "db", "education", "courses", id));
            toast({ title: "Course deleted successfully", status: "success", isClosable: true });
        } catch (err) {
            console.error("Error deleting course:", err);
            toast({ title: "Error deleting course", status: "error", isClosable: true });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "db", "education", "courses", formData.id), formData);
            toast({ title: "Course updated successfully", status: "success", isClosable: true });
            onClose();
        } catch (err) {
            console.error("Error updating course:", err);
            toast({ title: "Error updating course", status: "error", isClosable: true });
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleEditClick = (course) => {
        setFormData(course);
        onOpen();
    };
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    if (loading) return <Spinner size="xl" />;

    return (
        <Box>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading size="lg">Corsi</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => { setFormData({}); onOpen(); }}>
                    Add Job
                </Button>
            </Flex>
            {courses.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    No courses available.
                </Alert>
            ) : (
                <List spacing={6}>
                    {courses.map((course) => (
                        <ListItem key={course.id} borderWidth={1} borderRadius="lg" p={4}>
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading size="md">{course.title}</Heading>
                                <Stack direction="row">
                                    <IconButton icon={<EditIcon />} onClick={() => handleEditClick(course)} aria-label="Edit course" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(course.id)} aria-label="Delete course" />
                                </Stack>
                            </Flex>
                            <VStack align="start" spacing={2}>
                                <Badge colorScheme="teal">
                                    {formatDate(course.start)} - {formatDate(course.end)}
                                </Badge>
                                <Text as="i">
                                    <Link href={course.website} isExternal>{course.school} <ExternalLinkIcon mx="2px" /></Link>
                                </Text>
                                <Text>{course.description}</Text>
                            </VStack>
                            <Divider my={4} />
                            {course.link && (
                                <Button as={Link} href={course.link} isExternal colorScheme="teal" rightIcon={<ExternalLinkIcon />}>
                                    Allegato
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Course</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleUpdate}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel>Course Title</FormLabel>
                                    <Input name="title" value={formData?.title || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>School Name</FormLabel>
                                    <Input name="school" value={formData?.school || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input type="date" name="start" value={formData?.start || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <Input type="date" name="end" value={formData?.end || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea name="description" value={formData?.description || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link</FormLabel>
                                    <Input name="link" value={formData?.link || ""} onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Website</FormLabel>
                                    <Input name="website" value={formData?.website || ""} onChange={handleChange} />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CourseList;
