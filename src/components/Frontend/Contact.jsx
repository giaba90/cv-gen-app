import { VStack, Text, Link, Icon, Heading, Spinner, Avatar, Box } from '@chakra-ui/react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { useEffect, useReducer } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const initialState = {
    contactData: null,
    profilePhoto: null,
    loading: true,
    error: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                contactData: action.payload.contactData,
                profilePhoto: action.payload.profilePhoto,
                loading: false
            };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

function Contact() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactDocRef = doc(db, 'db', 'contacts');
                const bioDocRef = doc(db, 'Bio', 'summary');
                
                const [contactDocSnap, bioDocSnap] = await Promise.all([
                    getDoc(contactDocRef),
                    getDoc(bioDocRef)
                ]);
                
                if (contactDocSnap.exists() && bioDocSnap.exists()) {
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        payload: {
                            contactData: contactDocSnap.data(),
                            profilePhoto: bioDocSnap.data().photo
                        }
                    });
                } else {
                    dispatch({ type: 'FETCH_ERROR', payload: 'Nessun dato trovato' });
                }
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR', payload: 'Errore durante il recupero dei dati' });
                console.error(err);
            }
        };

        fetchData();
    }, []);

    if (state.loading) return <Spinner />;
    if (state.error) return <Text color="red.500">{state.error}</Text>;

    return (
        <VStack align="start" spacing={3} mb={8}>
            {state.profilePhoto && (
                <Box width="100%" display="flex" justifyContent="center" mb={4}>
                    <Avatar showBorder={true} size="2xl" src={state.profilePhoto} />
                </Box>
            )}
            {state.contactData && (
                <><Heading as="h2" size="lg">CONTACT</Heading>
                    <Link href={`mailto:${state.contactData.email}`} isExternal>
                        <Icon as={MdEmail} mr={2} />
                        {state.contactData.email}
                    </Link>
                    <Text>
                        <Icon as={MdPhone} mr={2} />
                        {state.contactData.tel}
                    </Text>
                    <Text>
                        <Icon as={MdLocationOn} mr={2} />
                        {state.contactData.address}
                    </Text>
                    <Link href={state.contactData.linkedinUrl} isExternal>
                        <Icon as={FaLinkedin} mr={2} />
                        {state.contactData.linkedin_profile.replace('https://www.', '')}
                    </Link>
                </>
            )}
        </VStack>
    );
}

export default Contact;