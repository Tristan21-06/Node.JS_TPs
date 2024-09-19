const contactService = require(process.env.PROJECT_DIR + "/services/contactService");
const Contact = require(process.env.PROJECT_DIR + "/models/contactModel");

const sectorLabels = {
    industrie: "Industrie",
    informatique: "Informatique",
    sante: "Santé",
    education: "Education",
}

module.exports.getContacts = async (req, res) => {
    let contacts = await contactService.getContacts({user: req.session.user._id});

    contacts.forEach(contact => {
        contact.sector = sectorLabels[contact.sector];
    })

    res.render('home', {
        contacts: contacts,
    });
};

module.exports.getContact = async (req, res) => {
    let contact = await contactService.getContact({_id: req.params.id});

    contact.sector = sectorLabels[contact.sector];

    res.render('item', {
        contact: contact
    });
};

module.exports.createContact = async (req, res) => {
    let errors = [];

    let properties = Object.keys(req.body);
    properties.forEach(property => {
        if (!req.body[property].length) {
            errors.push(`Le champ ${property} ne doit pas être vide`);
        }
    });

    if (properties.length && !errors.length) {
        req.body.user = req.session.user._id;

        let contact = new Contact(req.body);

        contact = await contactService.createContact(contact);
        
        res.redirect('/contact/' + contact._id)
        return;
    }

    res.render('add-item', {
        errors: errors
    });
}

module.exports.updateContact = async (req, res) => {
    let contact = await contactService.getContact({_id: req.params.id});

    let errors = [];

    let properties = Object.keys(req.body);
    properties.forEach(property => {
        if (!req.body[property].length) {
            errors.push(`Le champ ${property} ne doit pas être vide`);
        }
    });

    if (properties.length && !errors.length) {
        await contactService.updateContact({_id: req.params.id}, req.body);
        
        res.redirect('/contact/' + req.params.id)
        return;
    }

    res.render('edit-item', {
        errors: errors,
        contact: contact
    });
}

module.exports.deleteContact = async (req, res) => {
    await contactService.deleteContact({_id: req.params.id})

    res.redirect('/contact');
}