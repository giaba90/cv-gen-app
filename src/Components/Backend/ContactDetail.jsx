import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fbconfig';  // Importa il db configurato

const ContactDetail = () => {
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const docRef = doc(db, 'db', 'contact');  // db = nome della raccolta, contact = nome del documento
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setContactData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!contactData) {
        return <div>No data found!</div>;
    }

    return (
        <div>
            <h1>Contact Information</h1>
            {contactData.profile_image_url && (
                <div>
                    <img
                        src={contactData.profile_image_url}
                        alt="Profile"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                </div>
            )}
            <p><strong>Address:</strong> {contactData.address}</p>
            <p><strong>Email:</strong> {contactData.email}</p>
            <p><strong>Phone:</strong> {contactData.tel}</p>
            <p>
                <strong>Linkedin:</strong>
                <a href={contactData.linkedin_profile} target="_blank" rel="noopener noreferrer">
                    {contactData.linkedin_profile}
                </a>
            </p>
        </div>
    );
};

export default ContactDetail;
