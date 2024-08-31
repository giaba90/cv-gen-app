import { useState, useEffect } from 'react';
import { db } from "../../../fbconfig" // Importa il db configurato
import { doc, collection, query, orderBy, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

const ProjectList = () => {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProjectId, setEditingProjectId] = useState(null); // Stato per gestire la modifica del Progetto
    const [formData, setFormData] = useState({}); // Stato per i dati del Progetto da modificare

    useEffect(() => {
        const projectRef = doc(db, 'db', 'Projects');
        const projectCollectionRef = collection(projectRef, 'project');
        const q = query(projectCollectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const projectData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProject(projectData);
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
            const projectRef = doc(db, 'db', 'Projects');
            const ProjectDocRef = doc(projectRef, 'project', id);
            await deleteDoc(ProjectDocRef);
            console.log('Progetto eliminato con successo!');
        } catch (err) {
            console.error("Errore durante l'eliminazione del Progetto:", err);
            setError("Errore durante l'eliminazione del Progetto");
        }
    };

    const handleEditClick = (Project) => {
        setEditingProjectId(Project.id);
        setFormData(Project);
    };

    const handleCancelEdit = () => {
        setEditingProjectId(null); // Annulla la modifica
        setFormData({}); // Resetta i dati del modulo
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const projectRef = doc(db, 'db', 'project');
            const ProjectDocRef = doc(projectRef, 'project', editingProjectId);
            await updateDoc(ProjectDocRef, formData);
            console.log('Progetto aggiornato con successo!');
            setEditingProjectId(null);
            setFormData({});
        } catch (err) {
            console.error("Errore durante l'aggiornamento del Progetto:", err);
            setError("Errore durante l'aggiornamento del Progetto");
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
            <h1>Elenco dei Progetti</h1>
            {project.length === 0 ? (
                <p>Nessun Progetto disponibile.</p>
            ) : (
                <ul>
                    {project.map((Project) => (
                        <li key={Project.id}>
                            {editingProjectId === Project.id ? (
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        placeholder="Titolo del Progetto"
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
                                        name="link"
                                        value={formData.link || ''}
                                        onChange={handleChange}
                                        placeholder="Link"
                                    />
                                    <button type="submit">Salva</button>
                                    <button type="button" onClick={handleCancelEdit}>
                                        Annulla
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h2>{Project.title}</h2>
                                    <p>Link: <a href={Project.link} target="_blank" rel="noopener noreferrer">{Project.link}</a></p>
                                    <p>{Project.description}</p>
                                    <button onClick={() => handleEditClick(Project)}>Modifica</button>
                                    <button onClick={() => handleDelete(Project.id)}>Elimina</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;