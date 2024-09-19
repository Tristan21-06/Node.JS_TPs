const User = require(process.env.PROJECT_DIR + "/models/userModel");
const utils = require(process.env.PROJECT_DIR + "/utils");

module.exports.getUsers = async () => {
    try {
        let users = await User.find().populate('contacts');
        return users;
    } catch(e) {
        throw Error('Error while query all Users')
    }
}

module.exports.getUser = async (query) => {
    try {
        let user = await User.findOne(query).populate('contacts');
        return user;
    } catch(e) {
        throw Error('Error while query one User')
    }
}

module.exports.createUser = async (user) => {
    try {
        user.password = utils.encrypt(user.password);
    
        user = new User(req.body);

        return await user.save();
    } catch(e) {
    throw Error('Error while save User')
    }
}

module.exports.updateUser = async (query, user) => {
    try {
        if(query.password) {
            if (!query.password.length) {
                delete query.password;
            } else {
                query.password = utils.encrypt(query.password)
            }
        }

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