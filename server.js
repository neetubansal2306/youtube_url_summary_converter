const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Replace with your actual API keys
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// Function to get video transcript (placeholder)
async function getVideoTranscript(videoId) {
    // This is a placeholder. You would need to implement actual logic to fetch the transcript.
    // You can use libraries like `youtube-transcript` or similar to get the transcript.
    return "This is a simulated transcript of the video.";
}

// Function to summarize text using OpenAI's GPT-3
async function summarizeText(text) {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Summarize the following text:\n\n${text}\n\nSummary:`,
        max_tokens: 100,
        temperature: 0.5,
    }, {
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data.choices[0].text.trim();
}

app.post('/summarize', async (req, res) => {
    const { url } = req.body;

    // Extract video ID from the URL
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];

    if (!videoId) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        // Get the video transcript
        const transcript = await getVideoTranscript(videoId);

        // Summarize the transcript
        const summary = await summarizeText(transcript);

        return res.json({ summary });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});