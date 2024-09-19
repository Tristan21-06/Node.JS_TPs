const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');

const url = require('url');
const querystring = require('querystring');

const app = express();

const HIGHER  = 'higher';
const LOWER  = 'lower';
const EQUALS  = 'equals';

const checkGuess = (guess, answer) => {
    let result = EQUALS;
    if (guess > answer) {
        result = LOWER;
    } else if (guess < answer) {
        result = HIGHER;
    }

    return result;
}

// ----------------------- uses -------------------------

app.use(session({secret: 'secretpass'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ----------------------- sets -------------------------

app.set('view engine', 'ejs');+
app.set('views', __dirname + '/views');

// ----------------------- routes -------------------------

app.get('/', (req, res) => {
    const params = querystring.parse(url.parse(req.url).query);
    
    if (req.session.playerOne && req.session.playerTwo && req.session.objectName && req.session.objectValue && !params.restart) {
        res.redirect('/game');
        return;
    }

    req.session.guess = null;
    req.session.guesses = null;
    req.session.playerOne = null;
    req.session.playerTwo = null;
    req.session.objectName = null;
    req.session.objectValue = null;

    res.render('form');
});

app.post('/game/add', (req, res) => {
    if (req.body.playerOne && req.body.playerTwo && req.body.objectName && req.body.objectValue) {
        req.session.playerOne = req.body.playerOne;
        req.session.playerTwo = req.body.playerTwo;
        req.session.objectName = req.body.objectName;
        req.session.objectValue = req.body.objectValue;
        req.session.guesses = 0;
    }

    res.redirect('/');
});

app.get('/game', (req, res) => {


    res.render('game', {
        objectName: req.session.objectName,
        playerName: req.session.playerTwo,
        guesses: req.session.guesses,
        guess: checkGuess(
            req.session.guess,
            req.session.objectValue
        )
    });
});

app.post('/game/check', (req, res) => {
    req.session.guess = req.body.newTry;
    req.session.guesses += 1;

    res.redirect('/game');
});

app.use((req, res) => {
    res.status(404);
    res.render('not-found');
});

// ----------------------- start -------------------------

app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080 !');
});