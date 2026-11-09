const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shortName: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: "" },
  ntn: { type: String, default: "" },
  fontFamily: { type: String, default: "Times New Roman" },
  fontSize: { type: Number, default: 12 },
  letterheadStyle: { type: String, enum: ["classic", "modern", "minimal"], default: "classic" },
  primaryColor: { type: String, default: "#000000" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);