const CoverLetter = require("../models/CoverLetter");

exports.createCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.create({ ...req.body, createdBy: req.user._id });
    const populated = await CoverLetter.findById(coverLetter._id).populate("company");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoverLetters = async (req, res) => {
  try {
    const { company, type } = req.query;
    const filter = {};
    if (company) filter.company = company;
    if (type) filter.type = type;
    const letters = await CoverLetter.find(filter).populate("company").sort({ createdAt: -1 });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoverLetter = async (req, res) => {
  try {
    const letter = await CoverLetter.findById(req.params.id).populate("company");
    if (!letter) return res.status(404).json({ message: "Cover letter not found" });
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoverLetter = async (req, res) => {
  try {
    const letter = await CoverLetter.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("company");
    if (!letter) return res.status(404).json({ message: "Cover letter not found" });
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCoverLetter = async (req, res) => {
  try {
    const letter = await CoverLetter.findByIdAndDelete(req.params.id);
    if (!letter) return res.status(404).json({ message: "Cover letter not found" });
    res.json({ message: "Cover letter deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};