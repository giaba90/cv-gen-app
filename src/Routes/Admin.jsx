import { signOut, getAuth } from "firebase/auth";
import AddProjects from "../Components/Backend/AddProjetcs";
import ProjectList from "../Components/Backend/ProjectsList";

import CourseList from "../Components/Backend/CourseList";
import AddCourse from "../Components/Backend/AddCourse";
import ContactForm from "../Components/Backend/ContactForm";
import ContactDetail from "../Components/Backend/ContactDetail";

import JobList from "../components/Backend/JobList";
import AddJob from "../components/Backend/AddJob";
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
            <ProjectList></ProjectList>
            <AddProjects></AddProjects>
            <br />
            <br></br>
            <CourseList></CourseList>
            <br />
            <AddCourse></AddCourse>
            <br />
            <br />
            <ContactForm />
            <ContactDetail />
            <br /><br />
            <br />
            <JobList></JobList>
            <AddJob></AddJob>
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
