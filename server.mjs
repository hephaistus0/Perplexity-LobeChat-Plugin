// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://damp-reaches-11122-434fcd8858d2.herokuapp.com'
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/search', async (req, res) => {
    try {
        const response = await fetch(PERPLEXITY_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}` // API key is stored in an environment variable
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data from Perplexity API.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
