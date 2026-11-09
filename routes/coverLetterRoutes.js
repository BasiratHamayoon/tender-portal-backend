const express = require("express");
const router = express.Router();
const { createCoverLetter, getCoverLetters, getCoverLetter, updateCoverLetter, deleteCoverLetter } = require("../controllers/coverLetterController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createCoverLetter);
router.get("/", protect, getCoverLetters);
router.get("/:id", protect, getCoverLetter);
router.put("/:id", protect, updateCoverLetter);
router.delete("/:id", protect, deleteCoverLetter);

module.exports = router;