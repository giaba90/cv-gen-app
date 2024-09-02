import { useState, useEffect } from "react";
import { Box, Button, Divider, FormControl, FormLabel, Input, Link, Text, Flex, VStack, HStack, Spinner, useToast, } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { db } from "../../../fbconfig"; // Importa il db configurato
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, } from "firebase/firestore";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [formData, setFormData] = useState({});
    const toast = useToast();
    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const coursesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCourses(coursesData);
                setLoading(false);
            },
            (err) => {
                console.error("Errore durante il recupero dei corsi:", err);
                setError("Errore durante il recupero dei corsi");
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);
    const handleDelete = async (id) => {
        try {
            const educationRef = doc(db, "db", "education");
            const courseDocRef = doc(educationRef, "courses", id);
            await deleteDoc(courseDocRef);
            toast({
                title: "Corso eliminato con successo!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error("Errore durante l'eliminazione del corso:", err);
            setError("Errore durante l'eliminazione del corso");
        }
    };
    const handleEditClick = (course) => {
        setEditingCourseId(course.id);
        setFormData(course);
    };
    const handleCancelEdit = () => {
        setEditingCourseId(null);
        setFormData({});
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const educationRef = doc(db, "db", "education");
            const courseDocRef = doc(educationRef, "courses", editingCourseId);
            await updateDoc(courseDocRef, formData);
            toast({
                title: "Corso aggiornato con successo!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEditingCourseId(null);
            setFormData({});
        } catch (err) {
            console.error("Errore durante l'aggiornamento del corso:", err);
            setError("Errore durante l'aggiornamento del corso");
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    if (loading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }
    if (error) {
        return (
            <Text color="red.500" textAlign="center">
                {" "}
                {error}{" "}
            </Text>
        );
    }
    return (
        <Box>
            {" "}
            {courses.length === 0 ? (
                <Text> Nessun corso disponibile. </Text>
            ) : (
                <VStack spacing={4} align="stretch">
                    {" "}
                    {courses.map((course) => (
                        <Box key={course.id}>
                            {" "}
                            {editingCourseId === course.id ? (
                                <form onSubmit={handleUpdate}>
                                    <FormControl mb={3}>
                                        <FormLabel> Titolo del corso </FormLabel>{" "}
                                        <Input
                                            type="text"
                                            name="title"
                                            value={formData.title || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Nome della scuola </FormLabel>{" "}
                                        <Input
                                            type="text"
                                            name="school"
                                            value={formData.school || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Data Inizio </FormLabel>{" "}
                                        <Input
                                            type="date"
                                            name="start"
                                            value={formData.start || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Data Fine </FormLabel>{" "}
                                        <Input
                                            type="date"
                                            name="end"
                                            value={formData.end || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Descrizione </FormLabel>{" "}
                                        <Input
                                            type="text"
                                            name="description"
                                            value={formData.description || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Link </FormLabel>{" "}
                                        <Input
                                            type="url"
                                            name="link"
                                            value={formData.link || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <FormControl mb={3}>
                                        <FormLabel> Sito web </FormLabel>{" "}
                                        <Input
                                            type="url"
                                            name="website"
                                            value={formData.website || ""}
                                            onChange={handleChange}
                                        />{" "}
                                    </FormControl>{" "}
                                    <HStack spacing={3}>
                                        <Button colorScheme="teal" type="submit">
                                            Salva{" "}
                                        </Button>{" "}
                                        <Button colorScheme="red" onClick={handleCancelEdit}>
                                            Annulla{" "}
                                        </Button>{" "}
                                    </HStack>{" "}
                                </form>
                            ) : (
                                <>
                                    <Flex borderTop='1px' borderColor='teal' pt={4} flexDirection='column'>
                                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                            <HStack>
                                                <Text fontWeight="bold" fontSize="md" color="teal">
                                                    {" "}
                                                    {course.start} - {course.end}{" "}
                                                </Text>{" "}
                                                <Text fontWeight="bold" fontSize="lg">
                                                    {" "}
                                                    {course.title}{" "}
                                                </Text>{" "}
                                            </HStack>
                                            <HStack>
                                                <Button onClick={() => handleEditClick(course)}>
                                                    <EditIcon />
                                                </Button>{" "}
                                                <Button onClick={() => handleDelete(course.id)}>
                                                    <DeleteIcon />
                                                </Button>{" "}
                                            </HStack>{" "}
                                        </Box>

                                        <VStack align="start">
                                            <Text as="i">
                                                <Link href={course.website}> {course.school} </Link>{" "}
                                            </Text>{" "}

                                            <Text align="left" pt={2} pb={2}>
                                                {" "}
                                                {course.description}{" "}
                                            </Text>{" "}
                                            {course.link && (<Text><b>Link:</b> <Link as='i' href={course.link}> {course.link}</Link></Text>
                                            )}</VStack>{" "}
                                    </Flex>
                                </>
                            )}{" "}
                        </Box>
                    ))}{" "}
                </VStack>
            )}{" "}
        </Box>
    );
};
export default CourseList;
