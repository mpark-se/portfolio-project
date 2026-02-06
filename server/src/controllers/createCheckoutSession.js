import { stripe } from '../config/stripe.js'

export const createCheckoutSession = async (req, res) => {
    const { planType } = req.params;

    // Current possible subscription plans (subject to change)
    const plans = {
        '30w': {
            name: '30 Minute Lesson Weekly',
            amount: 3500,
            interval: 'week'
        },
        '1w': {
            name: '1 Hour Lesson Weekly',
            amount: 5500,
            interval: 'week'
        },
        '30m': {
            name: '30 Minute Lesson Monthly',
            amount: 12000,
            interval: 'month'
        },
        '1m': {
            name: '1 Hour Lesson Monthly',
            amount: 24000,
            interval: 'month'
        }
    };

    const plan = plans[planType];

    if (!plan) {
        return res.status(400).json({ error: 'Invalid plan type' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: plan.name,
                    },
                    unit_amount: plan.amount,
                    recurring: {
                        // Week or Month, depends on plan
                        interval: plan.interval, 
                    },
                },
                quantity: 1,
            }],
            mode: 'subscription',
            ui_mode: 'embedded',
            phone_number_collection: {
                enabled: true,
            },
            custom_fields: [
                {
                    key: 'student_name',
                    label: {
                        type: 'custom',
                        custom: "Student's Name",
                    },
                    type: 'text',
                    optional: false,
                }
            ],
            metadata: {
                plan_type: planType
            },
            return_url: `${frontendUrl}/shoppingCart/return?session_id={CHECKOUT_SESSION_ID}`
        });

        res.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
};
