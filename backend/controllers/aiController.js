// backend/controllers/aiController.js
const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Event recommendation
const recommendEvents = asyncHandler(async (req, res) => {
  try {
    const userInterests = req.body.interests;

    if (!userInterests) {
      res.status(400);
      throw new Error("Please provide user interests");
    }

    const prompt = `Suggest 5 events based on these interests: ${userInterests}`;

    const result = await model.generateContent(prompt);

    res.json({ recommendations: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chatbot response
const chatbotResponse = asyncHandler(async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      res.status(400);
      throw new Error("Please provide a message");
    }

    const prompt = `You are a helpful event chatbot. Reply to this message: ${userMessage}`;

    const result = await model.generateContent(prompt);

    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  recommendEvents,
  chatbotResponse,
};
