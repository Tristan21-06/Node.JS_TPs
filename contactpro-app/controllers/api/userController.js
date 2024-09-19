const userService = require(process.env.PROJECT_DIR + "/services/userService");
const User = require(process.env.PROJECT_DIR + "/models/userModel");
const crypto = require("crypto");
const { encrypt } = require(process.env.PROJECT_DIR + "/utils/function");

module.exports.getUsers = (req, res) => {
    userService.getUsers()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
};

module.exports.getUser = (req, res) => {
    userService.getUser({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
};

module.exports.createUser = (req, res) => {
    req.body.password = encrypt(req.body.password)

    let user = new User(req.body);

    userService.createUser(user)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.updateUser = (req, res) => {
    if(req.body.password) {
        if (!req.body.password.length) {
            delete req.body.password;
        } else {
            req.body.password = encrypt(req.body.password)
        }
    }
    
    userService.updateUser({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.deleteUser = (req, res) => {
    userService.deleteUser({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}