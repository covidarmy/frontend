const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    id: String,
    show: { type: Boolean, default: true },
    url: String,
    postedAt: String,
    authorId: String,
    retweetCount: Number,
    replyCount: Number,
    location: mongoose.Schema.Types.Mixed,
    resource: mongoose.Schema.Types.Mixed,
    status: 0,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Tweet", schema)
