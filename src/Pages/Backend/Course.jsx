import CourseList from "../../Components/Backend/Course/CourseList";
import AddCourse from "../../Components/Backend/Course/AddCourse";
export default function Course() {
    return (
        <div>
            <h1>This is the Course page !</h1>
            <br /><br />
            <AddCourse></AddCourse>
            <br></br>
            {/*  <CourseList></CourseList>*/}

        </div>
    );
}
