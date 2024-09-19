const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const app = express();

app.use(session({secret: 'secretpass'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('view engine', 'ejs');+
app.set('views', __dirname + '/views');

// routes

// http://localhost:8080
app.get('/', (req, res) => {
    console.log(req.session);
    res.render('home');
});

// page de register
app.get("/register", (req, res) => {
    // affiche le formulaire
    res.render("register");
});

// page de register
app.post("/register", (req, res) => {
    // récupère les données du formulaire
    let login = req.body.login;
    let password = req.body.password;
    // si le login ou le mot de passe ne sont pas renseignés
    if (login == "" || password == "") {
        // réaffiche la vue render avec le message d'erreurs
        res.render("register", {
            erreurs: "Login ou mot de passe ne peut pas être vide"
        })
    } else {
        req.session.login = login;
        req.session.password = password;
        // redirige sur la home
        res.redirect("/");
    }
});

// http://localhost:8080/Tristan/JACQUEMARD (cémoa)
app.get('/:firstname/:lastname', (req, res) => {
    res.render('bonjour', {
        firstname: req.params.firstname,
        lastname: req.params.lastname
    });
});

// Cas par défaut si les autres urls n'ont pas matché
// http://localhost:8080/toto
app.use((req, res) => {
    res.status(404);
    res.render('not-found');
});

app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080 !');
});