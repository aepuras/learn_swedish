const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");
const express = require("express");

const router = new express.Router();

router.get("/words", (req, res) => {
    getUserData("words", req, res);
});

function getUserData(name, req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const userId = decoded.sub;
    User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
            res.status(401).json({
                error: "No user",
            });
        } else {
            res.status(200).json({
                items: user[name],
            });
        }
    });
}

function getUserId(req) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    return decoded.sub;
}

router.post("/words", (req, res) => {
    User.findById(getUserId(req), (userErr, user) => {
        if (userErr || !user) {
            console.log(userErr);
            res.status(401).json({
                error: "No user",
            });
        } else {
            if (Object.keys(req.body.oldWord).length === 0) {
                const word = {
                    english: req.body.newWord.english.filter(n => n),
                    swedish: req.body.newWord.swedish.filter(n => n),
                };
                user.words.push(word);

            } else {
                let oldWord = req.body.oldWord;
                oldWord.english = oldWord.english.filter(n => n);
                oldWord.swedish = oldWord.swedish.filter(n => n);
                oldWord.helper === "" && delete oldWord.helper;
                !oldWord.learned && delete oldWord.learned;
                
                const index = user.words.findIndex(word => {
                    return JSON.stringify(word.english) === JSON.stringify(oldWord.english) &&
                    JSON.stringify(word.swedish) === JSON.stringify(oldWord.swedish) &&
                    (!oldWord.learned || word.learned === oldWord.learned) &&
                    (!oldWord.helper || word.helper === oldWord.helper);
                });

                if( index >= 0) {
                    user.words[index] = {
                        english : req.body.newWord.english.filter(n => n),
                        swedish : req.body.newWord.swedish.filter(n => n),
                        learned : req.body.newWord.learned,
                        helper : req.body.newWord.helper
                    };
                }
            }
            user.save(err => {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        error: "Error saving word",
                    });
                } else {
                    res.send("new word saved");
                }
            });
        }
    });
});

module.exports = router;
