import { signOut, getAuth } from "firebase/auth";
import CourseList from "../Components/Backend/CourseList";
import AddCourse from "../Components/Backend/AddCourse";
import ContactForm from "../Components/Backend/ContactForm";
import ContactDetail from "../Components/Backend/ContactDetail";

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
            <br></br>
            <CourseList></CourseList>
            <br />
            <AddCourse></AddCourse>
            <br />
            <br />
            <ContactForm />
            <ContactDetail />
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
