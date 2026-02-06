import {useState} from "react";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const handleSubscribe = async (e) => {
        e.preventDefault();
        setIsError(false);
        setErrorMessage('');

        if (!isValidEmail(email)) {
            setIsError(true);
            setErrorMessage('Invalid Email');
            setTimeout(() => {
                setIsError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/subscribe-newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Subscription failed');
            }

            const data = await response.json();
            setIsSuccess(true);
            setEmail('');
            setIsLoading(false);
            
            // Need a bit of timeout to reset
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Subscription error:', error);
            setIsError(true);
            setErrorMessage('Failed. Try Again');
            setIsLoading(false);

            // Need a bit of timeout to reset
            setTimeout(() => {
                setIsError(false);
                setErrorMessage('');
            }, 3000);
        }
    };
    
    return(
        <>
        {/* <!-- Newsletter --> */}
        <section className="bg-primary text-light p-5">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center">
                    <h3 className="mb-3 mb-md-0">Subscribe to my Newsletter!</h3>
                    <form onSubmit={handleSubscribe} className="input-group news-input">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSuccess || isLoading}
                            required
                        />
                        <button
                            className={`btn btn-lg ${
                                isSuccess ? 'btn-success' :
                                    isError ? 'btn-danger' :
                                        'btn-dark'
                            }`}
                            type="submit"
                            disabled={isLoading || isSuccess}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Subscribing...
                                </>
                            ) : isSuccess ? (
                                <>✓ Subscribed!</>
                            ) : isError ? (
                                <>✗ {errorMessage}</>
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <div id="projects"></div>
        </section>


        <section className="p-5 ">
            <div className="container-fluid">
                <div className="container">
                    <div className="row text-center my-2">
                        <div className="col-12">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe 
                                className="embed-responsive-item"
                                src="https://www.youtube.com/embed/jmVe5neR_o8"
                                allowFullScreen
                                style={{ width: '70%', height: '45vh' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="about-me"></div>
        </section>
        </>
    )
}

export default Newsletter