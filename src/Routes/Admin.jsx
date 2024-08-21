import { signOut, getAuth } from "firebase/auth";
import ContactForm from "../Components/Backend/ContactForm";

export function Admin() {
    const auth = getAuth();

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>This is the Admin page</h1>
            <br />
            <ContactForm />
            <br /><br />
            <button
                onClick={() => {
                    handleSignOut();
                }}
            >
                Sign Out
            </button>
        </div>
    );
}
