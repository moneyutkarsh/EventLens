// backend/routes/aiRoutes.js
const express = require("express");
const { recommendEvents, chatbotResponse } = require("../controllers/aiController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Protected routes (require JWT login)
router.post("/recommend", protect, recommendEvents);
router.post("/chat", protect, chatbotResponse);

module.exports = router;


