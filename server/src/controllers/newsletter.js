import { pool } from '../config/database.js'

export const newsletter = async (req, res) => {
    const { email } = req.body;

    try {
        // Save to database
        const query = `
            INSERT INTO newsletter_subscribers (email, subscribed_at)
            VALUES ($1, CURRENT_TIMESTAMP)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `;

        const result = await pool.query(query, [email]);

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Successfully subscribed!' });
        } else {
            res.json({ success: true, message: 'Already subscribed!' });
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ error: error.message });
    }
};
