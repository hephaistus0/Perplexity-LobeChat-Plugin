  // server.js
  import express from 'express';
  import fetch from 'node-fetch';
  import cors from 'cors';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import dotenv from 'dotenv';

  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 3001;
  const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.post('/search', async (req, res) => {
      res.set('Access-Control-Allow-Origin', '*');
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
