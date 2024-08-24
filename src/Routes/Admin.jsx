import { signOut, getAuth } from "firebase/auth";
import JobList from "../components/BackendJobList";
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
