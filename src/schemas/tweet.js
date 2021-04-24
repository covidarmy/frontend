const mongoose = require("mongoose")

const schema = mongoose.Schema(
  {
    id: String,
    show: { type: Boolean, default: true },
    url: String,
    postedAt: String,
    authorId: String,
    retweetCount: Number,
    replyCount: Number,
    status: {
      available: Number,
      busy: Number,
      invalid: Number,
    },
    location: mongoose.Schema.Types.Mixed,
    resource: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Tweet", schema)
