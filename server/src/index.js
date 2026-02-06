import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { createCheckoutSession } from './controllers/createCheckoutSession.js'
import {sessionStatus} from "./controllers/sessionStatus.js";
import {newsletter} from "./controllers/newsletter.js";
import {pool} from "./config/database.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

// For production - Add railway URL as well as custom domain
const allowedOrigins = [
    'http://localhost:5173',
    'https://portfolio-project-production-e0cd.up.railway.app', 
    'http://mpark-se.quest/' 
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to PostgreSQL database at:', res.rows[0].now);
    }
});

// Routes
app.post('/create-checkout-session/:planType', createCheckoutSession);
app.post('/subscribe-newsletter', newsletter)
app.get('/session-status', sessionStatus);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
