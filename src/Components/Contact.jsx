import { VStack, Text, Link, Icon, Heading } from '@chakra-ui/react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

function Contact() {
    return (
        <VStack align="start" spacing={3} mb={8}>
            <Heading as="h2" size="lg">CONTACT</Heading>
            <Link href="mailto:info@resumekraft.com" isExternal>
                <Icon as={MdEmail} mr={2} />
                info@resumekraft.com
            </Link>
            <Text>
                <Icon as={MdPhone} mr={2} />
                202-555-0120
            </Text>
            <Text>
                <Icon as={MdLocationOn} mr={2} />
                Chicago, Illinois, US
            </Text>
            <Link href="https://linkedin.com/resumekraft" isExternal>
                <Icon as={FaLinkedin} mr={2} />
                linkedin.com/resumekraft
            </Link>
        </VStack>
    );
}

export default Contact;