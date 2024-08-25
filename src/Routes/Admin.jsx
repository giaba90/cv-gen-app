import { signOut, getAuth } from "firebase/auth";
import AddProjects from "../Components/Backend/AddProjetcs";
import ProjectList from "../Components/Backend/ProjectsList";

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
