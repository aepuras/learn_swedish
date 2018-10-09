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

router.get("/verbs/:setName", (req, res) => {
    VerbsSet.find({ name: req.params.setName }, (userErr, verbsSet) => {
        if (userErr || !verbsSet) {
            res.status(401).json({
                error: "No verbs"
            });
        } else {
            res.status(200).json(verbsSet[0].items);
        }
    });
});

router.get("/words", (req, res) => {
    Word.find({ disabled: { $ne: true } }, (userErr, words) => {
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

router.post("/words", (req, res) => {
    let word = new Word({
        english: req.body.english.filter(n => n),
        swedish: req.body.swedish.filter(n => n)
    });

    word.save(err => {
        if (err) {
            return next(err);
        }
        res.send("new word saved");
    });
});

module.exports = router;
