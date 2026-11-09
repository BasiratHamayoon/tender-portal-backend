const express = require("express");
const router = express.Router();
const { createTag, createBulkTags, getTags, getTag, deleteTag, deleteBulkTags } = require("../controllers/tagController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createTag);
router.post("/bulk", protect, createBulkTags);
router.get("/", protect, getTags);
router.get("/:id", protect, getTag);
router.delete("/bulk", protect, deleteBulkTags);
router.delete("/:id", protect, deleteTag);

module.exports = router;