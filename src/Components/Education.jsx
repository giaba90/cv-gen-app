import { VStack, Text, Box, Heading, Flex, Spinner, Link } from '@chakra-ui/react';
import { useReducer, useEffect } from 'react';
import { db } from '../fbconfig';
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";

const initialState = {
    courses: [],
    loading: true,
    formData: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_COURSES':
            return { ...state, courses: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
}
function Education() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                dispatch({ type: 'SET_COURSES', payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
            },
            (err) => {
                console.error("Error fetching courses:", err);
                toast({ title: "Error fetching courses", status: "error", isClosable: true });
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        );

        return () => unsubscribe();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", { month: "short", year: "numeric" });
    };

    if (state.loading) return <Spinner size="xl" />;


    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#055C80">EDUCATION</Heading>
            {
            state.courses.map((course, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{course.title}</Text>
                        <Text color="#055C80" fontWeight="bold">  {formatDate(course.start)} - {formatDate(course.end)}</Text>
                    </Flex>
                    <Text as="i">
                        <Link href={course.website} isExternal>{course.school}</Link>
                    </Text>
                    <Text mt={2}>{course.description}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Education;