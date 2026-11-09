const express = require("express");
const router = express.Router();
const { getCompanies, getAllCompanies, getCompany, createCompany, updateCompany, deleteCompany } = require("../controllers/companyController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getCompanies);
router.get("/all", protect, getAllCompanies);
router.get("/:id", protect, getCompany);
router.post("/", protect, createCompany);
router.put("/:id", protect, updateCompany);
router.delete("/:id", protect, deleteCompany);

module.exports = router;