const CoverLetter = require("../models/CoverLetter");
const Tag = require("../models/Tag");
const Tender = require("../models/Tender");
const Company = require("../models/Company");

exports.getStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments({ isActive: true });
    const totalCoverLetters = await CoverLetter.countDocuments();
    const totalTags = await Tag.countDocuments();
    const totalTenders = await Tender.countDocuments();
    const recentCoverLetters = await CoverLetter.find({}).populate("company").sort({ createdAt: -1 }).limit(5);
    const recentTags = await Tag.find({}).populate("company").sort({ createdAt: -1 }).limit(5);
    const recentTenders = await Tender.find({}).populate("company").sort({ createdAt: -1 }).limit(5);
    const companyCounts = await Tender.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
      { $lookup: { from: "companies", localField: "_id", foreignField: "_id", as: "company" } },
      { $unwind: "$company" },
      { $project: { name: "$company.name", count: 1 } },
      { $sort: { count: -1 } }
    ]);
    res.json({ stats: { totalCompanies, totalCoverLetters, totalTags, totalTenders }, recentCoverLetters, recentTags, recentTenders, companyCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};