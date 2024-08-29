import { useState, useEffect } from 'react';
import { db } from '../../fbconfig'; // Assicurati che il percorso sia corretto
import { doc, collection, onSnapshot } from 'firebase/firestore';

const SkillList = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = () => {
            try {
                // Riferimento al documento 'skills' nella raccolta principale 'db'
                const skillsDocRef = doc(db, 'db', 'skills');
                // Riferimento alla raccolta 'skill' sotto il documento 'skills'
                const skillCollectionRef = collection(skillsDocRef, 'skill');

                // Usa onSnapshot per ascoltare le modifiche in tempo reale
                const unsubscribe = onSnapshot(
                    skillCollectionRef,
                    (snapshot) => {
                        const skillsData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setSkills(skillsData);
                        setLoading(false);
                    },
                    (err) => {
                        console.error('Errore durante il recupero delle skill:', err);
                        setError('Errore durante il recupero delle skill');
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

        fetchSkills();
    }, []);

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Elenco delle Skill</h1>
            {skills.length === 0 ? (
                <p>Nessuna skill disponibile.</p>
            ) : (
                <ul>
                    {skills.map((skill) => (
                        <li key={skill.id}>
                            <p>{skill.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SkillList;
