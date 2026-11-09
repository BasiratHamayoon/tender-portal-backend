const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  tagType: { type: String, enum: ["item-technical", "item-financial", "large-envelope-technical", "large-envelope-financial", "main-envelope"], required: true },
  tenderNumber: { type: String, default: "" },
  specificationNumber: { type: String, default: "" },
  itemName: { type: String, required: true },
  openingDate: { type: String, default: "" },
  addressedTo: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Tag", tagSchema);