import { signOut, getAuth } from "firebase/auth";
import CourseList from "../Components/Backend/CourseList";
import AddCourse from "../Components/Backend/AddCourse";
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
