const express = require('express');
require("./config/db.config")

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

