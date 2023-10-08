// Import required modules and initialize OpenAI (if you're using it)
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const withAuth = require('../../utils/auth')

// Create an instance of OpenAI using your API key (if you're using it)
// const openai = new OpenAI({ key: process.env.API_KEY });

// Define the route to handle POST requests to '/chat/ask'
router.post('/', withAuth, async (req, res) => {
  console.log("Received POST request to /chat/ask");
  console.log("Request body:", req.body); // Log the request body
  console.log("Testies");
  const { question } = req.body;

  try {
    // Use OpenAI to generate a response here if you're using it
    // const response = await openai.createChatCompletion({ messages: [...] });
    
    // For testing, you can use a static response as mentioned earlier
    const answer = "This is a static response for testing purposes";
    
    res.json({ answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  console.log("after testies");
});

module.exports = router;