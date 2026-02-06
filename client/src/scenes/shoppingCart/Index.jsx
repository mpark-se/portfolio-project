//TODO Shopping cart - link with stripe

import Navbar from "../navbar/index.jsx";
import Contact from "../homePage/Contact.jsx";
import {useCallback, useEffect, useState} from "react";
import { getCalApi } from "@calcom/embed-react";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js'
import Footer from "../footer/index.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ShoppingCart = () => {
    
    // Stripe POST function
    const [selectedPlan, setSelectedPlan] = useState(null);
    
    // const fetchClientSecret = useCallback((sessionUrl) => {
    //     return fetch(`${import.meta.env.VITE_API_URL}${sessionUrl}`, {
    //         method: "POST",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => data.clientSecret);
    // }, []);
    const fetchClientSecret = useCallback((sessionUrl) => {
        const fullUrl = `${import.meta.env.VITE_API_URL}${sessionUrl}`;

        console.log('=== FETCH DEBUG ===');
        console.log('Full URL:', fullUrl);
        console.log('Method: POST');

        return fetch(fullUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log('Response status:', res.status);
                console.log('Response ok?:', res.ok);

                if (!res.ok) {
                    return res.text().then(text => {
                        console.error('Error response body:', text);
                        throw new Error(`HTTP ${res.status}: ${text}`);
                    });
                }
                return res.json();
            })
            .then((data) => {
                console.log('Success! Data received:', data);
                return data.clientSecret;
            })
            .catch((error) => {
                console.error('=== FETCH FAILED ===');
                console.error('Error:', error);
                throw error;
            });
    }, []);
    
    // Cal.com integration
    useEffect(() => {
        (async function () {
            // Initialize each namespace sequentially
            for (const lesson of lessons) {
                const cal = await getCalApi({ namespace: lesson.namespace });
                cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
            }
        })();
    }, []);
    
    const lessons = [
        {
            id: 1,
            image: "/assets/pexels-begum-31161748.jpg",
            title: "Consultation",
            namespace: "consultation",
            description: "Take the first step in your musical journey, book a free consultation today!",
        },
        {
            id: 2,
            image: "/assets/pexels-eva-bronzini-6073196.jpg",
            title: "30 Minute Lesson",
            namespace: "30-minute-lesson",
            description: "Book a 30-minute lesson with a one-time fee. No commitment required.",
        },
        {
            id: 3,
            image: "/assets/pexels-pixabay-210764.jpg",
            title: "1 Hour Lesson",
            namespace: "1-hour-lesson",
            description: "Book an hour lesson with a one-time fee. No commitment required.",
        }
    ];
    const plans = [
        {
            id: 1,
            icon: "bi bi-file-music-fill",
            title: "30 Minute Lesson Weekly",
            description: "$35.00",
            checkout: "/create-checkout-session/30w",
        },
        {
            id: 2,
            icon: "bi bi-music-note",
            title: "1 Hour Lesson Weekly",
            description: "$55.00",
            checkout: "/create-checkout-session/1w",
        },
        {
            id: 3,
            icon: "bi bi-music-note-beamed",
            title: "30 Minute Lesson Monthly",
            description: "$120.00",
            checkout: "/create-checkout-session/30m",
        },
        {
            id: 4,
            icon: "bi bi-music-note-list",
            title: "1 Hour Lesson Monthly",
            description: "$200.00",
            checkout: "/create-checkout-session/1m",
        }
    ];

    
    return (
        <>
            <Navbar />
            {/*Subscriptions for recurring payments*/}
            <section className="bg-dark text-light p-5 text-center text-sm-start">
                <div className="container">
                    <h2 className="text-center"><span className="text-warning">Piano Lessons</span></h2>
                    <p className="lead text-center text-white mb-5">
                        If you’re interested in piano lessons, feel free to book a free consultation today. Lessons are available in piano performance, music theory & harmony, and music history.
                    </p>
                    <div className="row g-4">
                        {lessons.map((lesson) => (
                            <div key={lesson.id} className="col-md-6 col-lg-4">
                                <div className="card bg-secondary text-black">
                                    <div className="card-body text-center">
                                        <img src={lesson.image} className="rounded-circle mb-3" alt="" style={{ width: '200px', height: '200px', objectFit: 'cover' }}></img>
                                        <h3 className="card-title mb-3">{lesson.title}</h3>
                                        <p className="card-text">{lesson.description}</p>
                                        <button className="btn btn-dark"
                                            data-cal-namespace={lesson.namespace}
                                                data-cal-link={`mpark1994/${lesson.namespace}`}
                                            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                                        >Schedule a Lesson</button>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>            
            {/* Stripe Subscription Plans Section */}
            {!selectedPlan ? (
                <section className="p-5 bg-primary">
                    <div className="container">
                        <h2 className="text-center text-white">
                            Lesson Subscriptions
                        </h2>
                        <p className="lead text-center text-white mb-5">
                            Create a one-time subscription to handle recurring lesson payments automatically.
                        </p>

                        <div className="row text-center g-4 my-4">
                            {plans.map((plan) => (
                                <div key={plan.id} className="col-md">
                                    <div className="card bg-dark text-light">
                                        <div className="card-body text-center">
                                            <div className="h1 mb-3">
                                                <i className={plan.icon}></i>
                                            </div>
                                            <h3 className="card-title mb-3">
                                                {plan.title}
                                            </h3>
                                            {plan.description && (
                                                <p className="card-text">{plan.description}</p>
                                            )}
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setSelectedPlan(plan)}
                                            >
                                                Select Plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="p-5 bg-primary">
                    <div className="container">
                        <button
                            onClick={() => setSelectedPlan(null)}
                            className="btn btn-light mb-4"
                        >
                            ← Back to Plans
                        </button>
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">{selectedPlan.title}</h3>
                                <EmbeddedCheckoutProvider
                                    stripe={stripePromise}
                                    options={{
                                        fetchClientSecret: () => fetchClientSecret(selectedPlan.checkout)
                                    }}
                                >
                                    <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            </div>
                        </div>
                    </div>
                    
                </section>
            )}
            <Contact />
            <Footer />
        </>
    )
}

export default ShoppingCart;