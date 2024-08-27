import { signOut, getAuth } from "firebase/auth";
import AddSkill from "../Components/Backend/AddSkill";
import SkillList from "../Components/Backend/SkillList";

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
            <AddSkill></AddSkill>
            <SkillList></SkillList>
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
