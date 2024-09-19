const Contact = require(process.env.PROJECT_DIR + "/models/contactModel");
const User = require(process.env.PROJECT_DIR + "/models/userModel");

module.exports.getContacts = async (query = {}) => {
    try {
        let contacts = await Contact.find(query).populate('user').exec();
        return contacts;
    } catch(e) {
        throw Error('Error while query all Contacts')
    }
}

module.exports.getContact = async (query) => {
    try {
        let contact = await Contact.findOne(query).populate('user').exec();
        return contact;
    } catch(e) {
        throw Error('Error while query one Contact')
    }
}

module.exports.createContact = async (contact) => {
    try {
        contact = await contact.save();
        console.log(contact.user);
        
        await User.findByIdAndUpdate(contact.user,
            {
                $push: {
                    contacts: contact._id
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        )
        

        return contact;
    } catch(e) {
    throw Error('Error while save Contact')
    }
}

module.exports.updateContact = async (query, contact) => {
    try {
        return await Contact.updateOne(query, contact);
    } catch(e) {
        throw Error('Error while update Contact')
    }
}

module.exports.deleteContact = async (query) => {
    try {
        let contact = Contact.findOne(query);

        await User.findByIdAndUpdate(contact.user,
            {
                $pull: {
                    contacts: contact._id
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        )

        return await Contact.deleteOne(query);
    } catch(e) {
        throw Error('Error while delete Contact')
    }
}