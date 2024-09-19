const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.env.PROJECT_DIR = __dirname;

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const userApiRoute = require(process.env.PROJECT_DIR + "/routes/api/userRoute");

app.use("/api/user", userApiRoute);

app.listen(8080, () => {
    console.log('Le serveur est démarré sur le port 8080 !');
});

// ---- CreateOne ----
// let user = new User({
//     firstName: "Nicolas",
//     lastName: "Chevalier",
//     email: "nicolas@test.fr",
//     password: "12345"
// });
// ---- CreateOne ----

// ---- SaveOne ----
// user.save()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// ---- SaveOne ----

// ---- FindAll ----
// User.find()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error)) ;
// ---- FindAll ----


// ---- FindOne ----
// User.findOne({ _id: "66e840a4a78f7df88c8a53be" })
//     .then((data) => console.log(data))
//     .catch(error => console.log(error));
// ---- FindOne ----


// ---- UpdateOne ----
// User.updateOne({ _id: "66e840a4a78f7df88c8a53be" }, { password: "1111" })
//     .then((data) => console.log(data))
//     .catch(error => console.log(error));
// ---- UpdateOne ----


// ---- DeleteOne ----
// User.deleteOne({ _id: "66e840a8a7cec1eb17bf59f3" })
//     .then((data) => console.log(data))
//     .catch(error => console.log(error));
// ---- DeleteOne ----