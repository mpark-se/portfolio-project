

const Showcase = () => {


    return(
        <>
        {/* <!-- Showcase --> */}
        <section className="bg-dark text-light p-5 text-center text-sm-start">
            <div className="container">
                <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                        <h1 className="text-center"><span className="text-warning">Min Key Park</span></h1>
                        <p className="lead my-6 text-center">Musician & Software Developer</p>
                        <p> &#8203 </p>
                        <div className="text-center">
                            &rdquo;Information is liberating.
                            <br />Education is the premise of progress in
                            <br />every society, in every family.&rdquo;
                        </div>
                        <div className="text-center">
                            <br />
                            <em>- Kofi Annan</em>
                        </div>
                    </div>
                    
                    <img className="img-fluid w-50 d-none d-sm-block rounded-circle" src="../assets/profile.png" alt="" />

                </div>
            </div>
        </section>
        </>
    )
}

export default Showcase;