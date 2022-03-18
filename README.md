# QRcode

## Contexte

L’entreprise CodeAlpha s’est spécialisée dans la production de produits à destination des centrales
nucléaires, des laboratoires de physique, des universités, etc...
Elle doit gérer les présences de son personnel, techniciens, ingénieurs, responsables, etc. dans des
salles sous contraintes liées à la radioactivité.
Actuellement, elle utilise des lecteurs de cartes magnétiques à l’entrée de ses salles, permettant une
remontée des informations dans une application tiers avec enregistrement dans un fichier de type
tableur.
Elle désire remplacer, pour une meilleure gestion des accès, les lecteurs de cartes magnétiques par des
lecteurs de QR Code à l’entrée des salles avec un traitement par une application NodeJS interne

## Diagramme des cas d'utilisation

<img width="477" alt="cas d'utilisation" src="https://user-images.githubusercontent.com/77787321/159012736-6dcbdc2d-4aa4-4ea5-86a6-5d7601289dd3.png">

## Un diagramme UML des entités

<img width="441" alt="ULM" src="https://user-images.githubusercontent.com/77787321/159018352-1b99c69a-5a1e-459a-a39e-9b94f8d74867.PNG">

## Evil User Story

## Le code NodeJS du modèle pour la collection intervenants

Dans ce répertoire, créez un fichier nommé utilisateur.js .
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Utilisateur = new Schema({
identite: String,
code: String,
poste: String,
});
module.exports = mongoose.model('Utilisateurs', Utilisateur);
```
Ajoutez dans le fichier app.js le recours au module, à la fin des premiers require :
```
const mongoose = require('mongoose');
```
Créez le contrôleur utilisateurs.js, la vue utilisateurs.ejs et ajoutez la ligne du menu (avec le bon chemin !) qui manque ; n’oubliez pas les ajouts à faire dans 
le fichier app.js.

Intégrez le code ci-dessous dans utilisateurs.js, somme toutes assez simple :
```
var express = require('express');
var router = express.Router();
const Utilisateurs = require("../models/utilisateur");
// Page racine
router.get("/", async function (req, res, next) {
Utilisateurs.find({}, function (err, result) {
if (err) {
res.send(err);
} else {
res.render("utilisateurs", {
title: "Générateur QR Code",
 utilisateurs: result });
}
});
});
module.exports = router;

```




