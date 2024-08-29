import { useState } from 'react';
import { db, storage } from '../../fbconfig';
import { doc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AddReference = () => {
    const [formData, setFormData] = useState({
        job_title: '',
        description: '',
        name: '',
        photo: null,
    });

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError(null);
        setSuccessMessage('');

        try {
            let photoURL = '';

            if (formData.photo) {
                const photoRef = ref(storage, `photos/${formData.photo.name}`);
                const uploadTask = uploadBytesResumable(photoRef, formData.photo);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Progresso del caricamento può essere gestito qui
                    },
                    (error) => {
                        setError(`Errore durante il caricamento dell'immagine: ${error.message}`);
                        setUploading(false);
                    },
                    async () => {
                        try {
                            photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                            await addDoc(collection(doc(db, 'db', 'reference'), 'ref'), {
                                job_title: formData.job_title,
                                description: formData.description,
                                name: formData.name,
                                photo: photoURL,
                            });
                            setSuccessMessage('Recensione caricata con successo!');
                        } catch (error) {
                            setError(`Errore durante l'aggiunta del documento: ${error.message}`);
                        } finally {
                            setUploading(false);
                            setFormData({ job_title: '', description: '', name: '', photo: null });
                        }
                    }
                );
            } else {
                // Se non c'è una foto, aggiungi il documento senza il campo immagine
                await addDoc(collection(doc(db, 'db', 'reference'), 'ref'), {
                    job_title: formData.job_title,
                    description: formData.description,
                    name: formData.name,
                    photo: '',
                });
                setSuccessMessage('Recensione caricata con successo!');
                setUploading(false);
                setFormData({ job_title: '', description: '', name: '', photo: null });
            }
        } catch (err) {
            console.error('Errore durante il caricamento dei dati:', err);
            setError('Errore durante il caricamento dei dati');
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Carica Recensione</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="job_title"
                    placeholder="Qualifica del cliente"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Testo recensione"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nome del cliente"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                />
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Caricamento in corso...' : 'Carica Recensione'}
                </button>
            </form>
        </div>
    );
};

export default AddReference;
