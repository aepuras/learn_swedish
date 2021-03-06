const express = require("express");
const router = new express.Router();
const VerbsSet = require("mongoose").model("VerbsSet");

router.get("/verbs", (req, res) => {
    VerbsSet.find({}, (userErr, verbsSets) => {
        if (userErr || !verbsSets) {
            res.status(401).json({
                error: "No verbs",
            });
        } else {
            res.status(200).json({
                verbsSets,
            });
        }
    });
});

router.get("/verbs/:setName", (req, res) => {
    VerbsSet.find({ name: req.params.setName }, (userErr, verbsSet) => {
        if (userErr || !verbsSet) {
            res.status(401).json({
                error: "No verbs",
            });
        } else {
            res.status(200).json(verbsSet[0].items);
        }
    });
});

module.exports = router;
