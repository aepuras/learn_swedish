const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
    swedish: [String],
    english: [String]
});

module.exports = mongoose.model("Word", WordSchema);
