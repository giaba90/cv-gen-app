import CourseList from "../../Components/Backend/Course/CourseList";
import AddCourse from "../../Components/Backend/Course/AddCourse";
import Menu from "../../Components/Backend/Menu/Menu"
export default function Course() {
    return (
        <div>
            <Menu>Istruzione e Formazione</Menu>
            <h1>This is the Course page !</h1>
            <br /><br />
            <AddCourse></AddCourse>
            <br></br>
            {<CourseList></CourseList>}

        </div>
    );
}
