const contactService = require(process.env.PROJECT_DIR + "/services/contactService");
const Contact = require(process.env.PROJECT_DIR + "/models/contactModel");
const crypto = require("crypto");

module.exports.getContacts = (req, res) => {
    contactService.getContacts()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
};

module.exports.getContact = (req, res) => {
    contactService.getContact({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
};

module.exports.createContact = (req, res) => {
    if(req.session?.user) {
        req.body.user = req.session.user._id;
    }

    let contact = new Contact(req.body);

    contactService.createContact(contact)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.updateContact = (req, res) => {  
    contactService.updateContact({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}

module.exports.deleteContact = (req, res) => {
    contactService.deleteContact({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
}