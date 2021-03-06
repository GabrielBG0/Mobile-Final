const express = require('express')
const routes = express.Router()
const UserController = require('./Controllers/UserController')
const EstablishmentController = require('./Controllers/EstablishmentController')
const LabController = require('./Controllers/LabController')

routes.get('/user/:id', UserController.getInfo)
routes.get('/user/establishments/:id', UserController.getEstablishmentsStatus)
routes.get('/user/labs/:id', UserController.getLabs)
routes.post('/user', UserController.create)
routes.post('/user/login', UserController.login)
routes.post('/user/checkin', UserController.checkIn)
routes.put('/user/checkout', UserController.checkOut)
routes.put('/lab/auth', UserController.authoriseLab)
routes.put('/lab/unauth', UserController.unauthoriseLab)

routes.get('/establishment/:id', EstablishmentController.getInfo)
routes.post('/establishment', EstablishmentController.create)
routes.post('/establishment/login', EstablishmentController.login)

routes.get('/lab/:id', LabController.getInfo)
routes.post('/lab', LabController.create)
routes.post('/lab/login', LabController.login)
routes.put('/user/tag', LabController.tagPatient)
routes.put('/user/untag', LabController.untagPatient)

module.exports = routes