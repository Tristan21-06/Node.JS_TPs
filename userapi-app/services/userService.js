const User = require(process.env.PROJECT_DIR + "/models/userModel");

module.exports.getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch(e) {
        throw Error('Error while query all Users')
    }
}

module.exports.getUser = async (query) => {
    try {
        let user = await User.findOne(query);
        return user;
    } catch(e) {
        throw Error('Error while query one User')
    }
}

module.exports.createUser = async (user) => {
    try {
        return await user.save();
    } catch(e) {
    throw Error('Error while save User')
    }
}

module.exports.updateUser = async (query, user) => {
    try {
        return await User.updateOne(query, user);
    } catch(e) {
        throw Error('Error while update User')
    }
}

module.exports.deleteUser = async (query) => {
    try {
        return await User.deleteOne(query);
    } catch(e) {
        throw Error('Error while delete User')
    }
}