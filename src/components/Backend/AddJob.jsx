import { useState } from "react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../fbconfig"; // Importa il db configurato

const AddJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Riferimento al documento 'experience' nella raccolta principale
            const experienceRef = doc(db, "db", "experience");

            // Riferimento alla nuova raccolta 'jobs' sotto il documento 'experience'
            const jobsCollectionRef = collection(experienceRef, "jobs");

            // Aggiungi un nuovo documento alla raccolta 'jobs'
            await addDoc(jobsCollectionRef, {
                title: title,
                description: description,
                start: start,
                end: end,
                company: company,
                website: website,
                createdAt: serverTimestamp(), // Aggiungi un timestamp al documento
            });

            setStatus("Lavoro aggiunto con successo!");
            // Resetta i campi del form
            setTitle("");
            setDescription("");
            setStart("");
            setEnd("");
            setCompany("");
            setWebsite("");
        } catch (error) {
            console.error("Errore durante l'inserimento del Lavoro:", error);
            setStatus("Errore durante l'inserimento del Lavoro");
        }
    };

    return (
        <div>
            <h1>Aggiungi Lavoro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Posizione lavorativa:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>{" "}
                <div>
                    <label>Azienda:</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
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
                    <label>Sito Web:</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
                <button type="submit">Aggiungi Lavoro</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default AddJob;