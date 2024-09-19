const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://tjacquemard:qMsqy8vkEalq40R5@maxitaclardcluster.bna3w.mongodb.net/?retryWrites=true&w=majority&appName=MaxiTaclardCluster';

const User = require("./models/user");

mongoose.connect(dbUri)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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