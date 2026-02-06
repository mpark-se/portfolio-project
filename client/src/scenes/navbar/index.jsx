import {useLocation, useNavigate} from "react-router-dom";


const Navbar = () => {
    // TODO - set a link to shopping cart for lesson subscription payment automation
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const handleHomeClick = (e) => {
        // Prevent default anchor behavior
        e.preventDefault();

        if (isHomePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    }

    const handleNavClick = (e, sectionId) => {
        e.preventDefault(); 

        if (isHomePage) {
            document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return(
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
            <div className="container">
                <a href="/" onClick={handleHomeClick} className="navbar-brand">MP</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/" onClick={handleHomeClick} className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about-me" onClick={(e) => handleNavClick(e, '#about-me')} className="nav-link">About Me</a>
                        </li>
                        <li className="nav-item">
                            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="nav-link">Skills</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="nav-link">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a href="/shoppingCart" onClick={(e) => { e.preventDefault(); navigate('/shoppingCart'); }} className="nav-link">Music-Enrolment</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;