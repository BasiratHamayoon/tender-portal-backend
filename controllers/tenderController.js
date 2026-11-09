const Tender = require("../models/Tender");

exports.createTender = async (req, res) => {
  try {
    const tender = await Tender.create({ ...req.body, createdBy: req.user._id });
    const populated = await Tender.findById(tender._id).populate("company");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTenders = async (req, res) => {
  try {
    const { company, status } = req.query;
    const filter = {};
    if (company) filter.company = company;
    if (status) filter.status = status;
    const tenders = await Tender.find(filter).populate("company").sort({ createdAt: -1 });
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id).populate("company").populate("coverLetters").populate("tags");
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.json(tender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("company");
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.json(tender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.json({ message: "Tender deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};