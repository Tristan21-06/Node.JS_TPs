const crypto = require("crypto");

module.exports.encrypt = function (password, update = false) {
    return crypto
        .createHmac("sha512", process.env.PWD_SECRET_KEY)
        .update(password)
        .digest("base64");
}