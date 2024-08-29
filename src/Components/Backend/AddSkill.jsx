import { useState } from 'react';
import { db } from '../../fbconfig'; // Assicurati che il percorso sia corretto
import { doc, collection, addDoc } from 'firebase/firestore';

const AddSkill = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Riferimento al documento 'skills' nella raccolta principale 'db'
            const skillsDocRef = doc(db, 'db', 'skills');
            // Riferimento alla raccolta 'skill' sotto il documento 'skills'
            const skillCollectionRef = collection(skillsDocRef, 'skill');

            // Aggiungi un nuovo documento alla raccolta 'skill'
            await addDoc(skillCollectionRef, {
                name: name,
            });

            setSuccessMessage('Skill aggiunta con successo!');
            setName('');
        } catch (err) {
            console.error('Errore durante l\'aggiunta della skill:', err);
            setError('Errore durante l\'aggiunta della skill');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Aggiungi una Nuova Skill</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="Nome della skill"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Aggiungendo...' : 'Aggiungi Skill'}
                </button>
            </form>
        </div>
    );
};

export default AddSkill;
