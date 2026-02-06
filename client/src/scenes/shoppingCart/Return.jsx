import {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Return = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const hasRun = useRef(false);

    useEffect(() => {
        // useEffect is getting duplicated, don't delete this
        if (hasRun.current) return;
        hasRun.current = true;
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
            navigate('/shoppingCart');
            return;
        }
        
        fetch(`${import.meta.env.VITE_API_URL}/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerData(data);
                
                // Test
                // console.log(data);

                // Set 2 seconds to show confirmation to client before routing back
                setTimeout(() => {
                    navigate('/shoppingCart?success=true');
                }, 2000);
            })
            .catch((err) => {
                console.error('Error fetching session:', err);
                navigate('/shoppingCart?canceled=true');
            })
    }, [navigate]);

    if (status === 'complete') {
        return (
            <>
                <div className="container text-center my-5">
                    <h2 className="text-success">Payment successful! ✓</h2>
                    {customerData?.email && (
                        <p>Confirmation sent to: {customerData.email}</p>
                    )}
                    <p>Redirecting you back...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Processing payment...</p>
            </div>
        </>
    );
};

export default Return;