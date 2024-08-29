import { useState } from "react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../fbconfig"; // Importa il db configurato

const AddCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [school, setSchool] = useState("");
    const [link, setLink] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Riferimento al documento 'education' nella raccolta principale
            const educationRef = doc(db, "db", "education");

            // Riferimento alla nuova raccolta 'courses' sotto il documento 'education'
            const coursesCollectionRef = collection(educationRef, "courses");

            // Aggiungi un nuovo documento alla raccolta 'courses'
            await addDoc(coursesCollectionRef, {
                title: title,
                description: description,
                start: start,
                end: end,
                school: school,
                link: link,
                website: website,
                createdAt: serverTimestamp(), // Aggiungi un timestamp al documento
            });

            setStatus("Corso aggiunto con successo!");
            // Resetta i campi del form
            setTitle("");
            setDescription("");
            setStart("");
            setEnd("");
            setSchool("");
            setLink("");
            setWebsite("");
        } catch (error) {
            console.error("Errore durante l'inserimento del corso:", error);
            setStatus("Errore durante l'inserimento del corso");
        }
    };

    return (
        <div>
            <h1>Aggiungi Corso</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titolo di studio:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>{" "}
                <div>
                    <label>Scuola o Università:</label>
                    <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
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
                    <label>Data Inizio:</label>
                    <input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>
                <div>
                    <label>Data Fine:</label>
                    <input
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
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
                <div>
                    <label>Sito Web:</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Aggiungi Corso</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default AddCourse;
