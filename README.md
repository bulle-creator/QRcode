# Code Alpha

## Contexte

L’entreprise CodeAlpha s’est spécialisée dans la production de produits à destination des centrales nucléaires, des laboratoires de physique, des universités, etc...

Elle doit gérer les présences de son personnel, techniciens, ingénieurs, responsables, etc. dans des salles sous contraintes liées à la radioactivité. 

Actuellement, elle utilise des lecteurs de cartes magnétiques à l’entrée de ses salles, permettant une remontée des informations dans une application tiers avec enregistrement dans un fichier de type tableur. 

Elle désire remplacer, pour une meilleure gestion des accès, les lecteurs de cartes magnétiques par des lecteurs de QR Code à l’entrée des salles avec un traitement par une application NodeJS interne.

## Diagramme des cas d'utilisation cas d'utilisation

<img width="477" alt="cas d'utilisation" src="https://user-images.githubusercontent.com/77787321/159021116-d085091f-d572-469a-be96-50674f073757.png">

## Un diagramme UML des entités ULM

<img width="441" alt="ULM" src="https://user-images.githubusercontent.com/77787321/159021134-bbc7391c-e32d-458c-ad1d-a811bbf9b888.PNG">

## Evil User Story

En tant qu'utilisateur malveillant je veux avoir accés à la base de donée afin d'avoir accées à qui et à quelle heure entre le personnel dans la salle.

*Mesure de protéction:* Pour empêcher les personnes malveillantes d’avoir accès au mot de passe nous allons crypter certaine données comme leur codes d'identification.

```
var bcrypt = require('bcrypt');

exports.cryptCode = function(code, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(code, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

exports.compareCode = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isCodeMatch) {   
       return err == null ?
           callback(null, isCodeMatch) :
           callback(err);
   });
};
```

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
Créez le contrôleur utilisateurs.js, la vue utilisateurs.ejs et ajoutez la ligne du menu (avec le bon chemin !) qui manque ; n’oubliez pas les ajouts à faire dans le fichier app.js.

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

````
Puis la vue associée du tableau :

```
<!DOCTYPE html>
<html>
<head>
<title><%= title %></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
rel="stylesheet" integrity="sha384-
1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
crossorigin="anonymous">
<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
crossorigin="anonymous"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg bg-primary text-uppercase">
<div class="container">
<h1 class="text-white"><%= title %></h1>
<div class="collapse navbar-collapse" id="navbarResponsive">
<ul class="navbar-nav ms-auto">
<li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3
rounded text-white" href="/">Home</a></li>
<li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3
rounded text-white" href="/createqr">Create</a></li>
<li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3
rounded text-white" href="/utilisateurs">Utilisateurs</a></li>
</ul>
</div>
</div>
</nav>
<header class="masthead text-center">
<div class="container d-flex align-items-center flex-column">
<p></p>
</div>
</header>
<div class="container-fluid align-items-center">
<h1 class="cover-heading">Table du personnel</h1>
<div class="container bg-light text-dark">
<table class="table table-striped">
<thead>
<tr>
<th>Identité</th>
<th>Code</th>
<th>Poste</th>
</tr>
</thead>
<tbody>
<% utilisateurs.forEach(function(entry) { %>
<tr>
<td><%= entry.identite %></td>
<td><%= entry.code %></td>
<td><%= entry.poste %></td>
</tr>
<% }); %>
</tbody>
</table>
</div>
</div>
</body>
</html>

```
## Le code NodeJS du modèle pour la collection interventions

Créez un contrôleur createqr.js dans le répertoire des routes et un fichier createqr.ejs dans
le répertoire des vues

Cette nouveau contrôleur nécessite deux lignes supplémentaires dans app.js, faites-le… à vous de
trouver !

Mettez tout d'abord dans ce contrôleur les lignes ci-dessous :

```
var express = require('express');
var router = express.Router();
var path = require('path');
// Page initiale
   router.get('/', function(req, res, next) {
   res.render('createqr', { title: 'Générateur QR Code' });
   });
module.exports = router;
```
Mettez ensuite le code dans la vue createqr.ejs :

```
<!DOCTYPE html>
<html>
<head>
<title><%= title %></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
rel="stylesheet" integrity="sha384-
1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
crossorigin="anonymous">
<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
crossorigin="anonymous"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg bg-primary text-uppercase">
<div class="container">
<h1 class="text-white"><%= title %></h1>
<div class="collapse navbar-collapse" id="navbarResponsive">
<ul class="navbar-nav ms-auto">
<li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3
rounded text-white" href="/">Home</a></li>
<li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3
rounded text-white" href="/createqr">Create</a></li>
</ul>
</div>
</div>
</nav>
<header class="masthead text-center">
<div class="container d-flex align-items-center flex-column">
<p></p>
</div>
 </header>
<div class="container-fluid align-items-center">
 <div class="form-group">
<form action="/createqr/scan" method="POST" class="form">
<div class="form-group">
<label for="identite">Identité</label>
<input type="text" class="form-control" name="identite" id="identite"
placeholder="Entrez votre prénom suivi de votre nom">
</div>
<div class="form-group">
<label for="code">Code de sécurité :</label>
<input type="password" class="form-control" name="code" id="code"
placeholder="Entrez votre code à l'abri des regards...">
<div class="form-group">
<br />
<button type="submit" class="btn btn-outline-primary">Générer le QR
Code</button>
</form>
</div>
</div>
</body>
</html>

```
## Un tableau présentant les différentes URI supportées par votre API

## Sources :
* https://askcodez.com/node-js-cryptage-des-mots-de-passe.html
