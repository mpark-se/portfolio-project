

const LearnSections = () => {


    return(
        <>
        {/* <!-- Learn Sections --> */}
        <section className="p-5 bg-dark text-light">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md">
                        <img src="../assets/profile2.jpg" className="img-fluid rounded" alt="" />
                    </div>
                    <div className="col-md p-5">
                        <h2><span className="text-warning">About Me</span></h2>
                        <p className="lead">
                            Doctoral-Candidate classNameical Musician & Software Developer
                        </p>
                        <p>A concert pianist pivoting to software engineer, aspiring and highly motivated
                            with a problem-solver mindset. Hardworking and passionate, dedicated to 
                            achieving demanding business objectives.</p>
                        <a href="https://github.com/mpark-se" target="blank" className="btn btn-light mt-3">
                            <i className="bi bi-chevron-right"></i> See GitHub
                        </a>
                    </div>
                </div>
            </div>
            <div id="skills"></div>
        </section>

        <section id="learn" className="p-5">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md p-5">
                        <h2><span>Skills</span></h2>
                        <p className="lead">
                            Fluency in Python, JavaScript
                        </p>
                        <p className="lead">
                            Experience with SQL, HTML, CSS, Kotlin, R, Lua
                        </p>
                        <p>Django Web, Flask, React, React Native, Angular, Git, Git Bash, Linux, Unix, AWS Cloud, REST API, CI/CD, Unit Testing, Lambda, OOP, Visual Studio, Android Studio, Frontend, Backend, Full-Stack, UX/UI, Data Analytics, Tableau, Spreadsheets</p>
                        <a href="https://docs.google.com/document/d/1TwcyAOIyJeFz1e76eAOk-asdU6K1GtIK4nkBGFed2BA/edit?usp=sharing" target="blank" className="btn btn-dark mt-3">
                            <i className="bi bi-chevron-right"></i> See Resume
                        </a>
                    </div>
                    <div className="col-md">
                        <img src="../assets/programming_stock.png" className="img-fluid rounded" alt="" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default LearnSections