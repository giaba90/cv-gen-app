import React, { useState, useEffect } from 'react';
import { Box, Container, Flex, VStack, HStack, Image, Text, Button, IconButton, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Textarea, useDisclosure, useToast, Divider
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { db, storage } from '../../../fbconfig';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const Profile = () => {
  const [bioData, setBioData] = useState({});
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchBioData();
  }, []);

  const fetchBioData = async () => {
    const docRef = doc(db, 'Bio', 'summary');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBioData(docSnap.data());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'Bio', 'summary');
    let updatedData = { ...formData };

    if (imageFile) {
      const storageRef = ref(storage, 'profile_photos/photo');
      await uploadBytes(storageRef, imageFile);
      const photoURL = await getDownloadURL(storageRef);
      updatedData.photo = photoURL;
    }

    await setDoc(docRef, updatedData, { merge: true });
    fetchBioData();
    onClose();
    toast({
      title: 'Bio aggiornata.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (field) => {
    setFormData({ [field]: bioData[field] });
    onOpen();
  };

  const handleDelete = async (field) => {
    const docRef = doc(db, 'Bio', 'summary');
    await updateDoc(docRef, {
      [field]: deleteField()
    });
    if (field === 'photo') {
      const storageRef = ref(storage, 'profile_photos/photo');
      await deleteObject(storageRef);
    }
    fetchBioData();
    toast({
      title: `${field} eliminato.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <Flex direction="column" gap={8} mt={10} mb={10} borderRadius="lg" p={4} borderWidth={1} padding={4}>
       
        <Flex alignItems="center">
          <Box w="30%" borderRadius="lg" p={4} >
            {bioData.photo ? (
              <Image src={bioData.photo} alt="Profile" borderRadius="full" boxSize="150px" objectFit="cover" />
            ) : (
              <Box bg="gray.200" borderRadius="full" boxSize="150px" display="flex" alignItems="center" justifyContent="center">
                <Text>Nessuna foto</Text>
              </Box>
            )}
          </Box> 
          <VStack w="70%" spacing={4} alignItems="flex-start">
            <HStack>
              <Text fontSize="xl" fontWeight="bold">Nome: </Text>
              <Text>{bioData.name}</Text>
              <IconButton icon={<EditIcon />} onClick={() => handleEdit('name')} aria-label="Edit name" />
              <IconButton icon={<DeleteIcon />} onClick={() => handleDelete('name')} aria-label="Delete name" />
            </HStack>
            <HStack>
              <Text fontSize="xl" fontWeight="bold">Cognome: </Text>
              <Text>{bioData.surname}</Text>
              <IconButton icon={<EditIcon />} onClick={() => handleEdit('surname')} aria-label="Edit surname" />
              <IconButton icon={<DeleteIcon />} onClick={() => handleDelete('surname')} aria-label="Delete surname" />
            </HStack>
            <HStack>
              <Text fontSize="xl" fontWeight="bold">Qualifica: </Text><Text>{bioData.qualification}</Text>
              <IconButton icon={<EditIcon />} onClick={() => handleEdit('qualification')} aria-label="Edit qualification" />
              <IconButton icon={<DeleteIcon />} onClick={() => handleDelete('qualification')} aria-label="Delete qualification" />
            </HStack>
          </VStack>
        </Flex>

        <Divider />
        
        <Box>
          <HStack>   
            <Text fontSize="xl" fontWeight="bold">Descrizione:</Text>
            <IconButton icon={<EditIcon />} onClick={() => handleEdit('description')} aria-label="Edit description" />
            <IconButton icon={<DeleteIcon />} onClick={() => handleDelete('description')} aria-label="Delete description" />
          </HStack>
          <Text>{bioData.description}</Text>
        </Box>

        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
            Aggiungi Bio
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Aggiungi/Modifica Bio</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input name="name" value={formData.name || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Cognome</FormLabel>
                  <Input name="surname" value={formData.surname || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Qualifica</FormLabel>
                  <Input name="qualification" value={formData.qualification || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Descrizione</FormLabel>
                  <Textarea name="description" value={formData.description || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Foto</FormLabel>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Salva
              </Button>
              <Button onClick={onClose}>Annulla</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Profile;