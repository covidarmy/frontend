const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    id: String,
    show: { type: Boolean, default: true },
    url: String,
    postedAt: String,
    authorId: String,
    retweetCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    location: mongoose.Schema.Types.Mixed,
    resource: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
)

module.exports = mongoose.models.Tweet ?? mongoose.model("Tweet", schema)
