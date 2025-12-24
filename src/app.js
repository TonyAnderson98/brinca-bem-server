import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Health Check
app.get('/health', (req, res) => {
    return res.json({ status: 'ok' });
});

export default app;