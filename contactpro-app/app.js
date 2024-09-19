const express = require("express");
const session = require('cookie-session');

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

process.env.PROJECT_DIR = __dirname;

dotenv.config();

const app = express();

app.use(session({secret: 'secretpass'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.env.PROJECT_DIR + '/public'));

app.set('view engine', 'ejs');+
app.set('views', process.env.PROJECT_DIR + '/views');

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// ------ APP ------
const contactRoute = require(process.env.PROJECT_DIR + "/routes/contactRoute");
const appRoute = require(process.env.PROJECT_DIR + "/routes/appRoute");

app.use("/contact", contactRoute);
app.use("/", appRoute);
// ------ APP ------

// ------ API ------
const contactApiRoute = require(process.env.PROJECT_DIR + "/routes/api/contactRoute");
const userApiRoute = require(process.env.PROJECT_DIR + "/routes/api/userRoute");

app.use("/api/contact", contactApiRoute);
app.use("/api/user", userApiRoute);
// ------ API ------


app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080 !');
});