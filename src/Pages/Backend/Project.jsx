import ProjectList from "../../Components/Backend/Project/ProjectsList";
import AddProjects from "../../Components/Backend/Project/AddProjetcs";

export default function Project() {

    return (
        <div>
            <h1>This is the Project page !</h1>
            <br /><br />
            <ProjectList></ProjectList>
            <AddProjects></AddProjects>
        </div>
    );
}
