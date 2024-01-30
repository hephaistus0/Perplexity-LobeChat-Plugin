// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); // This applies CORS to all routes
app.use(express.json());

const PORT = process.env.PORT || 3001;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/search', async (req, res) => {
    try {
        const { query } = req.body; // Extract the "query" parameter from the incoming request
        const postData = {
            model: "mistral-7b-instruct",
            messages: [
                {
                    "role": "system",
                    "content": "Be precise and concise."
                },
                {
                    "role": "user",
                    "content": query // Use the "query" parameter from the incoming request
                }
            ]
        };

        const response = await fetch(PERPLEXITY_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
            },
            body: JSON.stringify(postData) // Send the constructed data to the Perplexity API
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
