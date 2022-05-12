const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: { required: true, type: mongoose.Types.ObjectId, ref: "user" },
    active: { type: Boolean, default: true },
    title: { required: true, type: String },
    frequency: { required: true, type: String },
    currency: { required: true, type: String },
    limit: { required: true, type: mongoose.Types.Decimal128 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("alert", userSchema);
