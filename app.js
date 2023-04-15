const express = require('express');

const app = express();

app.use ((req, res, next) => {
    console.log("Requete reçue !");
    next();
});

app.use(( req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requete a bien etait reçue !'});
    next();
});

app.use(( req, res) => {
    console.log('Réponse envoyé avec succèes !')
});

module.exports = app;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user_1:0202@atlascluster.xavjrat.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));