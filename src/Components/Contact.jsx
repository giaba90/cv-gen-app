import { VStack, Text, Link, Icon, Heading, Spinner } from '@chakra-ui/react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../fbconfig';

function Contact() {
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const docRef = doc(db, 'db', 'contacts');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setContactData(docSnap.data());
                } else {
                    setError('No contact data found');
                }
            } catch (err) {
                setError('Error fetching contact data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <VStack align="start" spacing={3} mb={8}>
            <Heading as="h2" size="lg">CONTACT</Heading>
            {contactData && (
                <>
                    <Link href={`mailto:${contactData.email}`} isExternal>
                        <Icon as={MdEmail} mr={2} />
                        {contactData.email}
                    </Link>
                    <Text>
                        <Icon as={MdPhone} mr={2} />
                        {contactData.tel}
                    </Text>
                    <Text>
                        <Icon as={MdLocationOn} mr={2} />
                        {contactData.address}
                    </Text>
                    <Link href={contactData.linkedinUrl} isExternal>
                        <Icon as={FaLinkedin} mr={2} />
                        {contactData.linkedin_profile}
                    </Link>
                </>
            )}
        </VStack>
    );
}

export default Contact;