const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
  try {
    const tag = await Tag.create({ ...req.body, createdBy: req.user._id });
    const populated = await Tag.findById(tag._id).populate("company");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBulkTags = async (req, res) => {
  try {
    const { company, items, tenderNumber, specificationNumber, openingDate, addressedTo } = req.body;
    const tags = [];
    const tagTypes = ["item-technical", "item-financial", "large-envelope-technical", "large-envelope-financial", "main-envelope"];
    for (const item of items) {
      for (const tagType of tagTypes) {
        tags.push({
          company,
          tagType,
          tenderNumber,
          specificationNumber,
          itemName: item,
          openingDate,
          addressedTo,
          createdBy: req.user._id
        });
      }
    }
    const created = await Tag.insertMany(tags);
    const populated = await Tag.find({ _id: { $in: created.map((t) => t._id) } }).populate("company");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const { company, tagType } = req.query;
    const filter = {};
    if (company) filter.company = company;
    if (tagType) filter.tagType = tagType;
    const tags = await Tag.find(filter).populate("company").sort({ createdAt: -1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).populate("company");
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBulkTags = async (req, res) => {
  try {
    const { ids } = req.body;
    await Tag.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Tags deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};