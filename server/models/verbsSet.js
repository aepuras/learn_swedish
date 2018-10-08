const mongoose = require("mongoose");

const VerbsSetSchema = new mongoose.Schema({
	name: {
		type: String,
		index: { unique: true }
	},
	items: [
		{
			english: String,
			infinitiv: String,
			presens: String,
			preteritum: String,
			supinum: String,
			imperativum: String
		}
	]
});

module.exports = mongoose.model("VerbsSet", VerbsSetSchema);
