// src/components/ContactForm.js
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../fbconfig';  // Importa il db configurato

const ContactForm = () => {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Crea un riferimento al documento contact nella raccolta db
            const docRef = doc(db, 'db', 'contact');

            // Imposta i dati nel documento contact
            await setDoc(docRef, {
                address: address,
                email: email,
                tel: tel,
                linkedin_profile: linkedin
            });

            setStatus('Dati inseriti con successo!');
            // Resetta i campi del form
            setAddress('');
            setEmail('');
            setTel('');
            setLinkedin('');
        } catch (error) {
            console.error('Errore durante l\'inserimento dei dati:', error);
            setStatus('Errore durante l\'inserimento dei dati');
        }
    };

    return (
        <div>
            <h1>Inserisci Contatto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address:</label>
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
                    <label>Linked Profile:</label>
                    <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Inserisci</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ContactForm;
