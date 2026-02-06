import Contact from "./Contact.jsx";
import Footer from "../footer";
import LearnSections from "./LearnSection.jsx";
import Navbar from "../navbar";
import Newsletter from "./Newsletter.jsx";
import Showcase from "./Showcase.jsx";




const HomePage = () => {

    return (
        <>
            <Navbar />
            <Showcase />
            <Newsletter />
            <LearnSections />
            <Contact />
            {/*TODO Set up google maps after Google business profile*/}
            <Footer />
        </>
    )
}

export default HomePage;