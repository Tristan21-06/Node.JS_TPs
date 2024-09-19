const userService = require(process.env.PROJECT_DIR + "/services/userService");

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
    userService.createUser(req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.updateUser = (req, res) => {
    userService.updateUser({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.deleteUser = (req, res) => {
    userService.deleteUser({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}