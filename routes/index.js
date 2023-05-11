const express = require('express')
const Controller = require('../controllers')
const router = express.Router()


router.get('/', Controller.landing)

router.get('/register', Controller.addAccount)

router.post('/register', Controller.createAccount)

router.get('/login', Controller.loginForm)

router.post('/login', Controller.postLogin)

// router.use((req, res, next) => {
//     if(!req.session.email){
//         res.redirect('/login')
//     }else{
//         next()
//     }
//   })
// router.get('/home', Controller.home)

// router.get('/teams', Controller.teams)

// router.get('/teams/add', Controller.addTeam)

// router.post('/teams/add', Controller.createTeam)

// router.get('/teams/:id/delete', Controller.deleteTeam)

// router.get('/teams/:id/edit', Controller.editTeam)

// router.post('/teams/:id/edit', Controller.updatedTeam)

// router.get('/sports', Controller.sports)

// router.get('/sports/add', Controller.addSport)

// router.post('/sports/add', Controller.createSport)

// router.get('/championship', Controller.championship)

module.exports = router