

const Footer = () => {


    return(
        <>
        {/* <!-- Footer --> */}
        <footer className="p-5 bg-dark text-white text-center position-relative">
            <div className="container">
                <p className="lead">Copyright &copy; 2022 Min Key Park</p>
                <a href="https://www.linkedin.com/in/min-key-park-715500246/" target="_blank"><i className="bi bi-linkedin mx-1"></i></a>
                <a href="https://github.com/mpark-se" target="_blank"><i className="bi bi-github mx-1"></i></a>
                <a href="#" className="position-absolute bottom-0 end-0 p-5">
                    <i className="bi bi-arrow-up-circle h1"></i>
                </a>
            </div>
        </footer>
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        <script src="script.js"></script> */}
        </>
    )
}

export default Footer;