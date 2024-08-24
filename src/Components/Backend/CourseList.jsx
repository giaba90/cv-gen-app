// src/components/CourseList.js
import { useState, useEffect } from "react";
import { db } from "../../fbconfig";
import {
    doc,
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCourseId, setEditingCourseId] = useState(null); // Stato per gestire la modifica del corso
    const [formData, setFormData] = useState({}); // Stato per i dati del corso da modificare

    useEffect(() => {
        const educationRef = doc(db, "db", "education");
        const coursesCollectionRef = collection(educationRef, "courses");
        const q = query(coursesCollectionRef, orderBy("end", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const coursesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setCourses(coursesData);
                setLoading(false);
            },
            (err) => {
                console.error("Errore durante il recupero dei corsi:", err);
                setError("Errore durante il recupero dei corsi");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            const educationRef = doc(db, "db", "education");
            const courseDocRef = doc(educationRef, "courses", id);
            await deleteDoc(courseDocRef);
            console.log("Corso eliminato con successo!");
        } catch (err) {
            console.error("Errore durante l'eliminazione del corso:", err);
            setError("Errore durante l'eliminazione del corso");
        }
    };

    const handleEditClick = (course) => {
        setEditingCourseId(course.id); // Imposta lo stato per identificare il corso in modifica
        setFormData(course); // Imposta i dati correnti del corso nel modulo di modifica
    };

    const handleCancelEdit = () => {
        setEditingCourseId(null); // Annulla la modifica
        setFormData({}); // Resetta i dati del modulo
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const educationRef = doc(db, "db", "education");
            const courseDocRef = doc(educationRef, "courses", editingCourseId);
            await updateDoc(courseDocRef, formData);
            console.log("Corso aggiornato con successo!");
            setEditingCourseId(null);
            setFormData({});
        } catch (err) {
            console.error("Errore durante l'aggiornamento del corso:", err);
            setError("Errore durante l'aggiornamento del corso");
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
            <h1>Elenco dei Corsi</h1>
            {courses.length === 0 ? (
                <p>Nessun corso disponibile.</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            {editingCourseId === course.id ? (
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title || ""}
                                        onChange={handleChange}
                                        placeholder="Titolo del corso"
                                    />
                                    <input
                                        type="text"
                                        name="school"
                                        value={formData.school || ""}
                                        onChange={handleChange}
                                        placeholder="Nome della scuola"
                                    />
                                    <input
                                        type="date"
                                        name="start"
                                        value={formData.start || ""}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="date"
                                        name="end"
                                        value={formData.end || ""}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description || ""}
                                        onChange={handleChange}
                                        placeholder="Descrizione"
                                    />
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link || ""}
                                        onChange={handleChange}
                                        placeholder="Link"
                                    />
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website || ""}
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
                                    <h2>{course.title}</h2>
                                    <p>Scuola: {course.school}</p>
                                    <p>Data Inizio: {course.start}</p>
                                    <p>Data Fine: {course.end}</p>
                                    <p>{course.description}</p>
                                    <p>
                                        Link:{" "}
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {course.link}
                                        </a>
                                    </p>
                                    <p>
                                        Sito Web:{" "}
                                        <a
                                            href={course.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {course.website}
                                        </a>
                                    </p>
                                    <button onClick={() => handleEditClick(course)}>
                                        Modifica
                                    </button>
                                    <button onClick={() => handleDelete(course.id)}>
                                        Elimina
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CourseList;
