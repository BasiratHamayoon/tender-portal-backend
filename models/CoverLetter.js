const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  type: { type: String, enum: ["technical", "financial"], required: true },
  date: { type: String, required: true },
  addressedTo: { type: String, required: true },
  tenderNumber: { type: String, default: "" },
  itemName: { type: String, required: true },
  openingDate: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("CoverLetter", coverLetterSchema);