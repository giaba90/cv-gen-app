import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../../../fbconfig"; // Importa il db configurato

const ContactForm = () => {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [profileImage, setProfileImage] = useState(null); // Stato per l'immagine del profilo
    const [currentImageUrl, setCurrentImageUrl] = useState(''); // Stato per l'URL dell'immagine attuale
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false); // Stato per il caricamento dell'immagine

    // Carica i dati esistenti dal documento Firestore quando il componente si monta
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'db', 'contact');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAddress(data.address || '');
                    setEmail(data.email || '');
                    setTel(data.tel || '');
                    setLinkedin(data.linkedin_profile || '');
                    setCurrentImageUrl(data.profile_image_url || '');
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        setUploading(true);

        try {
            let imageURL = currentImageUrl; // Mantieni l'URL attuale se l'immagine non cambia

            if (profileImage) {
                const imageRef = ref(storage, `profileImages/${profileImage.name}`);
                const uploadTask = uploadBytesResumable(imageRef, profileImage);

                // Gestisci il caricamento dell'immagine
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Puoi implementare una barra di progresso qui, se lo desideri
                    },
                    (error) => {
                        console.error("Errore durante il caricamento dell'immagine:", error);
                        setStatus("Errore durante il caricamento dell'immagine");
                        setUploading(false);
                    },
                    async () => {
                        imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await saveData(imageURL);
                    }
                );
            } else {
                await saveData(imageURL); // Salva i dati senza caricare una nuova immagine
            }
        } catch (error) {
            console.error("Errore durante l'inserimento dei dati:", error);
            setStatus("Errore durante l'inserimento dei dati");
            setUploading(false);
        }
    };

    const saveData = async (imageURL) => {
        // Dopo aver ottenuto l'URL dell'immagine, salva i dati nel documento 'contact'
        await setDoc(doc(db, 'db', 'contact'), {
            address,
            email,
            tel,
            linkedin_profile: linkedin,
            profile_image_url: imageURL, // Salva l'URL dell'immagine nel documento
        });

        setUploading(false);
        setStatus('Dati aggiornati con successo!');
        resetForm();
    };

    const resetForm = () => {
        setProfileImage(null);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <h1>Modifica Contatto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Indirizzo:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telefono:</label>
                    <input
                        type="text"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Profilo LinkedIn:</label>
                    <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Immagine del Profilo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {currentImageUrl && !profileImage && (
                        <div>
                            <img src={currentImageUrl} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        </div>
                    )}
                </div>
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Caricamento in corso...' : 'Aggiorna Contatto'}
                </button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ContactForm;
