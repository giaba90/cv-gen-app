import { getAuth } from "firebase/auth";
export function Homepage() {
    const auth = getAuth();

    return (
        <div>
            <h1>This is the Home page</h1>
        </div>
    );
}
