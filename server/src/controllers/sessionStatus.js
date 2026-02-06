import { stripe } from '../config/stripe.js'
import { pool } from '../config/database.js'

export const sessionStatus = async (req, res) => {
    const sessionId = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['customer', 'subscription']
        });

        // Need to differentiate customer and student
        const studentName = session.custom_fields?.find(
            field => field.key === 'student_name'
        )?.text?.value || '';
        const customerName = session.customer_details.name || '';
        
        const customerData = {
            stripeCustomerId: typeof session.customer === 'string'
                ? session.customer
                : session.customer?.id,
            stripeSubscriptionId: typeof session.subscription === 'string'
                ? session.subscription
                : session.subscription?.id,
            stripeSessionId: sessionId,
            email: session.customer_details.email,
            name: customerName,
            studentName: studentName,
            phone: session.customer_details.phone,
            planType: session.metadata.plan_type,
            amountTotal: session.amount_total,
            currency: session.currency,
            status: session.status,
        };
        
        // Test
        // console.log(customerData);
        
        if (customerData.stripeCustomerId) {
            const query = `
                INSERT INTO subscriptions (stripe_customer_id,
                                           stripe_subscription_id,
                                           stripe_session_id,
                                           email,
                                           name,
                                           student_name,
                                           phone,
                                           plan_type,
                                           amount_total,
                                           currency,
                                           status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (stripe_subscription_id)
            DO
                UPDATE SET
                    email = $4,
                    name = $5,
                    student_name = $6,
                    phone = $7,
                    plan_type = $8,
                    amount_total = $9,
                    currency = $10,
                    status = $11,
                    updated_at = CURRENT_TIMESTAMP
                    RETURNING *;
            `;

            const values = [
                customerData.stripeCustomerId,
                customerData.stripeSubscriptionId,
                customerData.stripeSessionId,
                customerData.email,
                customerData.name,
                customerData.studentName,
                customerData.phone,
                customerData.planType,
                customerData.amountTotal,
                customerData.currency,
                customerData.status
            ];

            const result = await pool.query(query, values);
            console.log('Saved to database:', result.rows[0]);
        }

        res.json(customerData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};