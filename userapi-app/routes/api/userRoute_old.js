const express = require("express");
const router = express.Router();

const User = require(process.env.PROJECT_DIR + "/models/userModel");

const crypto = require("crypto");

router.route("/users").get((req, res) => {
    User.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

router.route("/:id").get((req, res) => {
    User.findOne({ _id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

router.route("/:id").put((req, res) => {
    if(req.body.password) {
        req.body.password = crypto
            .createHmac("sha512",process.env.PWD_SECRET_KEY)
            .update(req.body.password)
            .digest("base64");
    }

    User.updateOne({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id").delete((req, res) => {
    User.deleteOne({ _id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
});

router.route("/").post((req, res) => {
    req.body.password = crypto
        .createHmac("sha512",process.env.PWD_SECRET_KEY)
        .update(req.body.password)
        .digest("base64");

    let user = new User(req.body);

    user.save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;