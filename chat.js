const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data || response.data.length === 0) {
            throw new Error("Invalid response from AI model.");
        }

        const reply = response.data[0]?.generated_text || "I couldn't understand that.";
        res.json({ reply });

    } catch (error) {
        console.error("Hugging Face API Error:", error.response?.data || error.message);
    
        res.status(500).json({
            error: "AI model failed to respond.",
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
