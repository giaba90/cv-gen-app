import JobList from "../../Components/Backend/Job/JobList";
import AddJob from "../../Components/Backend/Job/AddJob";

export default function Job() {

    return (
        <div>
            <h1>This is the Job page !</h1>
            <br /><br />
            <JobList></JobList>
            <AddJob></AddJob>
        </div>
    );
}
