const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    name: String,
    searchTerm: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Resource", schema)
