const { Coach, Game, Team, Tournament } = require('../models/index')
// const { formatCurrency } = require('../helpers/index')
const bcrypt = require('bcryptjs');


class Controller {
    static landing(req, res) {
        res.redirect('/login')
    }

    static registerFrom(req, res) {
        res.render('registerForm')
    }

    static createAccount(req, res) {
        const { fullName, email, password } = req.body
        Coach.create({ fullName, email, password })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginForm(req, res) {
        res.render('loginForm')
    }

    static postLogin(req, res) {
        const { email, password } = req.body;
        const error = 'Invalid username/password'
        Coach.findOne({ where: { email } })
            .then(data => {
                if (data) {
                    if (bcrypt.compareSync(password, data.password)) {
                        req.session.email = data.email
                        res.redirect('/teams')
                    } else {
                        return res.redirect(`login?error=${error}`)
                    }
                } else {
                    return res.redirect(`login?error=${error}`)
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            })
    }

    static logOut(req, res) {
        res.send("OK")
    }


    static home(req, res) {
        Game.findAll()
            .then(data => {
                res.render("tournament", { data });
            })
            .catch(err => {
                res.send(err)
            })
    }

    static teams(req, res) {
        Team.findAll({
            include: {
                model: Coach
            }
        })
            .then((data) => {
                res.render('team', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller