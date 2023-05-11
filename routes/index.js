const Controller = require('../controllers');
const router = require('express').Router()
const league = require('./routerLeague')
const teams = require('./routerTeams')


router.get('/',Controller.landing)

router.get('/register',Controller.registerFrom)

router.post('/register', Controller.createAccount)

router.get('/login', Controller.loginForm)

router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
    if(!req.session.email){
        res.redirect('/login')
    }else{
        next()
    }
})

// router.use('/league', league)
router.use('/teams', teams)


module.exports = router