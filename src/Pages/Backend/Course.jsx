import CourseList from "../../Components/Backend/CourseList";
import AddCourse from "../../Components/Backend/AddCourse";
export default function Course() {
    return (
        <div>
            <h1>This is the Course page !</h1>
            <br /><br />
            <CourseList></CourseList>
            <AddCourse></AddCourse>
        </div>
    );
}
