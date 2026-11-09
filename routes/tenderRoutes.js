const express = require("express");
const router = express.Router();
const { createTender, getTenders, getTender, updateTender, deleteTender } = require("../controllers/tenderController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createTender);
router.get("/", protect, getTenders);
router.get("/:id", protect, getTender);
router.put("/:id", protect, updateTender);
router.delete("/:id", protect, deleteTender);

module.exports = router;