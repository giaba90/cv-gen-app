import ContactForm from "../../Components/Backend/Contact/ContactForm";
import ContactDetail from "../../Components/Backend/Contact/ContactDetail";

export default function Contact() {

    return (
        <div>
            <h1>This is the Contact page !</h1>
            <br /><br />
            <ContactForm />
            <ContactDetail />
        </div>
    );
}
