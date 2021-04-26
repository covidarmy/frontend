const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    sinceId: { type: String, default: null },
});

module.exports = mongoose.model("meta", schema, "meta");