const express = require("express");
const router = new express.Router();
const Word = require("mongoose").model("Word");
const VerbsSet = require("mongoose").model("VerbsSet");

router.get("/verbs", (req, res) => {
    VerbsSet.find({}, (userErr, verbsSets) => {
        if (userErr || !verbsSets) {
            res.status(401).json({
                error: "No verbs"
            });
        } else {
            res.status(200).json({
                verbsSets
            });
        }
    });
});

router.get("/words", (req, res) => {
    Word.find({}, (userErr, words) => {
        if (userErr || !words) {
            res.status(401).json({
                error: "No words"
            });
        } else {
            res.status(200).json({
                words
            });
        }
    });
});

module.exports = router;
