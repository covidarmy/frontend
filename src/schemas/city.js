const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    name: String,
    state: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("City", schema)
