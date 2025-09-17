const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API route for chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // First, try to get data from Wikipedia
    const wikipediaResponse = await searchWikipedia(message);
    if (wikipediaResponse) {
      return res.json({ response: wikipediaResponse });
    }

    // If no Wikipedia result, try Google (requires API key)
    // Note: Google Custom Search API requires a key. Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID env vars
    const googleResponse = await searchGoogle(message);
    if (googleResponse) {
      return res.json({ response: googleResponse });
    }

    // Fallback response
    res.json({ response: "I'm sorry, I couldn't find information on that topic. Please try rephrasing your question." });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to search Wikipedia
async function searchWikipedia(query) {
  try {
    // First, search for pages
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await axios.get(searchUrl);
    if (response.data && response.data.extract) {
      return `From Wikipedia: ${response.data.extract}`;
    }
  } catch (error) {
    // If direct summary fails, try search API
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
      const response = await axios.get(searchUrl);
      if (response.data.query.search.length > 0) {
        const topResult = response.data.query.search[0];
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topResult.title)}`;
        const summaryResponse = await axios.get(summaryUrl);
        if (summaryResponse.data && summaryResponse.data.extract) {
          return `From Wikipedia (${topResult.title}): ${summaryResponse.data.extract}`;
        }
      }
    } catch (searchError) {
      console.error('Wikipedia search error:', searchError);
    }
  }
  return null;
}

// Function to search Google (requires API key)
async function searchGoogle(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) {
    return "Google search requires API key setup. Please set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID environment variables.";
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    if (response.data.items && response.data.items.length > 0) {
      const topResult = response.data.items[0];
      return `From Google (${topResult.title}): ${topResult.snippet}`;
    }
  } catch (error) {
    console.error('Google search error:', error);
  }
  return null;
}

// Start server
app.listen(PORT, () => {
  console.log(`Saar Chatbot running on http://localhost:${PORT}`);
});
