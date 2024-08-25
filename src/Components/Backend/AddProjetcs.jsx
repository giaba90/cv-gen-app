import { useState } from 'react';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../fbconfig';

const AddProjects = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const projectsRef = doc(db, 'db', 'Projects');
            const projectCollectionRef = collection(projectsRef, 'project');

            await addDoc(projectCollectionRef, {
                description,
                title,
                link,
                createdAt: serverTimestamp()  // Aggiungi un timestamp al documento
            });

            setStatus('Progetto aggiunto con successo!');
            setDescription('');
            setTitle('');
            setLink('');
        } catch (error) {
            console.error('Errore durante l\'inserimento del Progetto:', error);
            setStatus('Errore durante l\'inserimento del Progetto');
        }
    };

    return (
        <div>
            <h1>Aggiungi Progetto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titolo del progetto:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descrizione:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Link:</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                <button type="submit">Aggiungi Progetto</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default AddProjects;
