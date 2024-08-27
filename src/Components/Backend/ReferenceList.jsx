import { useState, useEffect } from 'react';
import { db } from '../../fbconfig';
import { doc, collection, onSnapshot } from 'firebase/firestore';

const ReferenceList = () => {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                // Riferimento al documento 'reference' nella raccolta principale 'db'
                const referenceRef = doc(db, 'db', 'reference');
                // Riferimento alla raccolta 'ref' sotto il documento 'reference'
                const refCollectionRef = collection(referenceRef, 'ref');

                // Usa onSnapshot per ascoltare le modifiche in tempo reale
                const unsubscribe = onSnapshot(
                    refCollectionRef,
                    (snapshot) => {
                        const referencesData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setReferences(referencesData);
                        setLoading(false);
                    },
                    (err) => {
                        console.error('Errore durante il recupero delle referenze:', err);
                        setError('Errore durante il recupero delle referenze');
                        setLoading(false);
                    }
                );

                // Cleanup del listener quando il componente viene smontato
                return () => unsubscribe();
            } catch (err) {
                console.error('Errore durante il caricamento dei dati:', err);
                setError('Errore durante il caricamento dei dati');
                setLoading(false);
            }
        };

        fetchReferences();
    }, []);

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Elenco delle Referenze</h1>
            {references.length === 0 ? (
                <p>Nessuna referenza disponibile.</p>
            ) : (
                <ul>
                    {references.map((ref) => (
                        <li key={ref.id}>
                            <h2>{ref.job_title}</h2>
                            <p>Nome: {ref.name}</p>
                            <p>Descrizione: {ref.description}</p>
                            {ref.photo && <img src={ref.photo} alt={ref.name} width="150" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReferenceList;
