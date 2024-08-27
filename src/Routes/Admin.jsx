import { signOut, getAuth } from "firebase/auth";
import AddReference from "../Components/Backend/AddReference";
import ReferenceList from "../Components/Backend/ReferenceList";
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
