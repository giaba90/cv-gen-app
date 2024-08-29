import { useState, useEffect } from 'react';
import { db } from '../../fbconfig';
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingJobId, setEditingJobId] = useState(null); // Stato per gestire la modifica del lavoro
    const [formData, setFormData] = useState({}); // Stato per i dati del lavoro da modificare

    useEffect(() => {
        const experienceRef = doc(db, 'db', 'experience');
        const jobsCollectionRef = collection(experienceRef, 'jobs');
        const q = query(jobsCollectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const jobsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setJobs(jobsData);
                setLoading(false);
            },
            (err) => {
                console.error('Errore durante il recupero dei lavori:', err);
                setError('Errore durante il recupero dei lavori');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            const experienceRef = doc(db, 'db', 'experience');
            const JobDocRef = doc(experienceRef, 'jobs', id);
            await deleteDoc(JobDocRef);
            console.log('lavoro eliminato con successo!');
        } catch (err) {
            console.error("Errore durante l'eliminazione del lavoro:", err);
            setError("Errore durante l'eliminazione del lavoro");
        }
    };

    const handleEditClick = (Job) => {
        setEditingJobId(Job.id); // Imposta lo stato per identificare il lavoro in modifica
        setFormData(Job); // Imposta i dati correnti del lavoro nel modulo di modifica
    };

    const handleCancelEdit = () => {
        setEditingJobId(null); // Annulla la modifica
        setFormData({}); // Resetta i dati del modulo
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const experienceRef = doc(db, 'db', 'experience');
            const JobDocRef = doc(experienceRef, 'jobs', editingJobId);
            await updateDoc(JobDocRef, formData);
            console.log('Lavoro aggiornato con successo!');
            setEditingJobId(null);
            setFormData({});
        } catch (err) {
            console.error("Errore durante l'aggiornamento del lavoro:", err);
            setError("Errore durante l'aggiornamento del lavoro");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Elenco dei Lavori</h1>
            {jobs.length === 0 ? (
                <p>Nessun lavoro disponibile.</p>
            ) : (
                <ul>
                    {jobs.map((Job) => (
                        <li key={Job.id}>
                            {editingJobId === Job.id ? (
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        placeholder="Titolo del lavoro"
                                    />
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company || ''}
                                        onChange={handleChange}
                                        placeholder="Nome della società"
                                    />
                                    <input
                                        type="date"
                                        name="start"
                                        value={formData.start || ''}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="date"
                                        name="end"
                                        value={formData.end || ''}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        placeholder="Descrizione"
                                    />
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website || ''}
                                        onChange={handleChange}
                                        placeholder="Sito web"
                                    />
                                    <button type="submit">Salva</button>
                                    <button type="button" onClick={handleCancelEdit}>
                                        Annulla
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h2>{Job.title}</h2>
                                    <p>Società: <a href={Job.website} target="_blank" rel="noopener noreferrer">{Job.company}</a></p>
                                    <p>Data Inizio: {Job.start}</p>
                                    <p>Data Fine: {Job.end}</p>
                                    <p>{Job.description}</p>
                                    <button onClick={() => handleEditClick(Job)}>Modifica</button>
                                    <button onClick={() => handleDelete(Job.id)}>Elimina</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobList;
