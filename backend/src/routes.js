const express = require('express');
//imports
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');



const crypto = require('crypto');
const connection = require('./database/connection');

const routes = express.Router();
//login
routes.post('/login', LoginController.create);




//Rota  Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Rotas Incidents
routes.post('/casos', IncidentController.create);
routes.get('/casos', IncidentController.index);
routes.delete('/casos/:id', IncidentController.delete); 


// perfil
routes.get('/perfil', ProfileController.index);


module.exports = routes;