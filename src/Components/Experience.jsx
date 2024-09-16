import { VStack, Text, Box, Heading, Flex, Link } from '@chakra-ui/react';
import { useEffect, useReducer } from "react";
import { db } from "../fbconfig";
import { collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";

const initialState = {
    jobs: [],
    loading: true,
    formData: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_JOBS':
            return { ...state, jobs: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
}


function Experience() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const experienceRef = doc(db, "db", "experience");
        const jobsCollectionRef = collection(experienceRef, "jobs");
        const q = query(jobsCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                dispatch({ type: 'SET_JOBS', payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
            },
            (err) => {
                console.error("Error fetching jobs:", err);
                toast({ title: "Error fetching jobs", status: "error", isClosable: true });
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
    
    return (
        <VStack align="start" spacing={6} mb={8}>
            <Heading as="h2" size="lg" color="#055C80">EXPERIENCE</Heading>
            {state.jobs.map((job, index) => (
                <Box key={index} width="100%">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">{job.title}</Text>
                        <Text color="#055C80" fontWeight="bold"> {formatDate(job.start)} - {formatDate(job.end)}</Text>
                    </Flex>
                    <Text as="i"><Link href={job.website} isExternal>{job.company}</Link></Text>
                    <Text mt={2}>{job.description}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Experience;