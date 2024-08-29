import { signOut, getAuth } from "firebase/auth";
import AddSkill from "../../Components/Backend/AddSkill";
import SkillList from "../../Components/Backend/SkillList";
import AddReference from "../../Components/Backend/AddReference";
import ReferenceList from "../../Components/Backend/ReferenceList";
import AddProjects from "../../Components/Backend/AddProjetcs";
import ProjectList from "../../Components/Backend/ProjectsList";
import CourseList from "../../Components/Backend/CourseList";
import AddCourse from "../../Components/Backend/AddCourse";
import ContactForm from "../../Components/Backend/ContactForm";
import ContactDetail from "../../Components/Backend/ContactDetail";
import JobList from "../../Components/Backend/JobList";
import AddJob from "../../Components/Backend/AddJob";

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
            <AddReference></AddReference>
            <ReferenceList></ReferenceList>
            <br />
            <AddSkill></AddSkill>
            <SkillList></SkillList>
            <br />
            <ProjectList></ProjectList>
            <AddProjects></AddProjects>
            <br />
            <CourseList></CourseList>
            <AddCourse></AddCourse>
            <br />
            <ContactForm />
            <ContactDetail />
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
