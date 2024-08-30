import AddReference from "../../Components/Backend/AddReference";
import ReferenceList from "../../Components/Backend/ReferenceList";

export default function Reference() {

    return (
        <div>
            <h1>This is the Reference page !</h1>
            <br /><br />
            <AddReference></AddReference>
            <ReferenceList></ReferenceList>
        </div>
    );
}
