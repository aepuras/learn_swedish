const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
	swedish: [String],
	english: [String],
	helper: String,
	learned: Boolean
});

module.exports = mongoose.model("Word", WordSchema);
