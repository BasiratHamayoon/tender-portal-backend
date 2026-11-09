const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  tenderNumber: { type: String, required: true },
  addressedTo: { type: String, required: true },
  openingDate: { type: String, required: true },
  items: [{ type: String }],
  coverLetters: [{ type: mongoose.Schema.Types.ObjectId, ref: "CoverLetter" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  status: { type: String, enum: ["draft", "generated", "submitted"], default: "draft" },
  notes: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Tender", tenderSchema);