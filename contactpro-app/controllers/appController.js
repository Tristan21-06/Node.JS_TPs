const userService = require(process.env.PROJECT_DIR + "/services/userService");

const utils = require(process.env.PROJECT_DIR + "/utils");

module.exports.logout = async (req, res) => {
    delete req.session.user;

    res.redirect('/login');
};

module.exports.register = async (req, res) => {
    let errors = [];
    
    let properties = Object.keys(req.body);
    properties.forEach(property => {
        if (!req.body[property].length) {
            errors.push(`Le champ ${property} ne doit pas être vide`);
        }
    });

    if (properties.length && !errors.length) {
        let user = await userService.createUser(req.body);
        
        req.session.user = user;
        
        res.redirect('/contact');
        return;
    }

    res.render('register', {
        errors: errors
    });
};

module.exports.login = async (req, res) => {
    let errors = [];

    let properties = Object.keys(req.body);
    properties.forEach(property => {
        if (!req.body[property].length) {
            errors.push(`Le champ ${property} ne doit pas être vide`);
        }
    });

    if (properties.length && !errors.length) {
        req.body.password = utils.encrypt(req.body.password);

        let user = await userService.getUser(req.body);
                    
        if (!user) {
            errors.push('La combinaison email/mot de passe ne fonctionne pas');
        } else {
            req.session.user = user;
            
            res.redirect('/contact');
            return;
        }
    }

    res.render('login', {
        errors: errors
    });
}