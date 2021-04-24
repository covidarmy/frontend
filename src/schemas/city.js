const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    name: String,
    synonyms: { type: [String], default: [] },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("City", schema)
