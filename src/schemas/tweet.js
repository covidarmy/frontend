const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema(
  {
    id: String,
    show: Boolean,
    url: String,
    postedAt: String,
    status: String,
    votes: Number,
    location: mongoose.Schema.Types.Mixed,
    resource: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Tweet", tweetSchema)
