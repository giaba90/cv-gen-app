import AddSkill from "../../Components/Backend/Skill/AddSkill";
import SkillList from "../../Components/Backend/Skill/SkillList";

export default function Skill() {

    return (
        <div>
            <h1>This is the Skill page !</h1>
            <br /><br />
            <AddSkill></AddSkill>
            <SkillList></SkillList>
        </div>
    );
}
