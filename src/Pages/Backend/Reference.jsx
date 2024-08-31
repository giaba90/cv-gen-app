import AddReference from "../../Components/Backend/Reference/AddReference";
import ReferenceList from "../../Components/Backend/Reference/ReferenceList";

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
