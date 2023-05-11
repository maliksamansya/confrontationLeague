const router = require('express').Router()
const Controller = require('../controllers')

router.get('/home', Controller.home)

router.get('/', Controller.teams)

// router.get('/add', Controller.addTeams)

// router.post('/add', Controller.createTeams)

// router.get('/:id/delete', Controller.deleteTeams)

// router.get('/:id/edit', Controller.editTeams)

// router.post('/:id/edit', Controller.updatedTeams)

module.exports = router;    