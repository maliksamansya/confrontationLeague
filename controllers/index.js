// File mas Danar
const { Coach, Game, Team, Tournament, Player, Teamtournament } = require('../models/index')
const { Op } = require("sequelize");
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
        let { TeamName } = req.query
        Team.filter(TeamName, Coach)
            .then((teams) => {
                res.render('team', { teams })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addTeam(req, res) {
        Coach.findAll()
            .then(coaches => {
                res.render('add-team', { coaches })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static createTeam(req, res) {
        // console.log(req.body);
        let errors = []
        let { name, foundedYear, countryOfOrigin, CoachId } = req.body
        Team.create({ name, foundedYear, countryOfOrigin, CoachId })
            .then(coaches => {
                // res.render('add-team', { coaches })
                res.redirect('/teams')
            })
            .catch(err => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    res.send('Pelatih yang kamu pilih sudah melatih tim lain, pelatih tidak boleh diganti')
                } else {
                    console.log(err);
                    res.send(err)
                }

            })
    }

    static editTeam(req, res) {
        let id = +req.params.id
        let coachContainer;
        Coach.findAll()
            .then(coaches => {
                coachContainer = coaches
                return Team.findByPk(+id)
            })
            .then(team => {
                res.render('edit-team', { coachContainer, team })

            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static updateTeam(req, res) {
        // console.log(req.body);
        let id = req.params.id
        let { name, foundedYear, countryOfOrigin, CoachId } = req.body

        Team.update({ name, foundedYear, countryOfOrigin, CoachId }, {
            where: {
                id: id
            }
        })
            .then(_ => {
                res.redirect('/teams')
            })
            .catch(err => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    res.send('Pelatih yang kamu pilih sudah melatih tim lain, pelatih tidak boleh diganti')
                } else {
                    console.log(err);
                    res.send(err)
                }
            })
    }

    static deleteTeam(req, res) {
        let id = +req.params.id
        Team.destroy({
            where: {
                id: id
            }
        })
            .then(_ => {
                // res.render('add-team', { coaches })
                res.redirect('/teams')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static detailTeam(req, res) {
        let id = +req.params.id
        Team.findAll({
            include: {
                model: Player
            },
            where: {
                id: id
            }
        })
            .then(team => {
                // res.send(team)
                team = team[0]
                res.render('detail-team', { team })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static Tournament(req, res) {
        // include: {
        //     model: Team
        // }
        let id = +req.params.id
        // console.log(id);
        Tournament.findAll({

        })
            .then(tournaments => {
                // res.send(tournaments)
                res.render('list-tournament', { tournaments, id })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static games(req, res) {
        Game.findAll()
            .then(games => {
                // res.send(tournaments)
                res.send(games)
                // res.render('game', { games })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    // static joinTournamentGet(req, res) {
    //     // console.log(req.params);
    //     // let { tournamentId, teamId } = req.params
    //     // tournamentId = Number(tournamentId)
    //     // teamId = Number(teamId)
    //     // console.log(tournamentId, teamId);
    //     // Teamtournament.findAll()
    //     //     .then(teamTournaments => {
    //     //         teamTournaments.forEach(el => {
    //     //             if (el.TeamId === teamId && el.TournamentId === tournamentId) {
    //     //                 throw new Error('You cannot join this competion again')
    //     //             }
    //     //         });
    //     //         return Teamtournament.create({ teamId, tournamentId })
    //     //     })
    //     //     .then(updatedTeamTournament => {
    //     //         res.redirect('/teams')
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(err);
    //     //         res.send(err)
    //     //     })
    //     res.render
    // }

    // static joinTournamentPost(req, res) {
    //     let { tournamentId, teamId } = req.params
    //     tournamentId = Number(tournamentId)
    //     teamId = Number(teamId)
    //     console.log(tournamentId, teamId);
    //     Teamtournament.findAll()
    //         .then(teamTournaments => {
    //             teamTournaments.forEach(el => {
    //                 if (el.TeamId === teamId && el.TournamentId === tournamentId) {
    //                     throw new Error('You cannot join this competion again')
    //                 }
    //             });
    //             return Teamtournament.create({ teamId, tournamentId })
    //         })
    //         .then(updatedTeamTournament => {
    //             res.redirect('/teams')
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.send(err)
    //         })
    // }



}

module.exports = Controller

// const { Coach, Team } = require('./../models')
// const bcrypt = require('bcryptjs');
// const { google } = require("calendar-link");
// class Controller {
//     static landing(req, res) {
//         // res.send('holla')
//         res.render('landing')
//     }

//     static addAccount(req, res) {
//         res.render('registerForm')
//     }

//     static createAccount(req, res) {
//         const { fullName, email, password } = req.body
//         Coach.create({ fullName, email, password })
//             .then(() => {
//                 res.redirect('/')
//             })
//             .catch(err => {
//                 res.send(err)
//             })
//     }

//     static loginForm(req, res) {
//         res.render('loginForm')
//     }

//     static postLogin(req, res) {
//         const { email, password } = req.body;
//         const error = 'Invalid username/password'
//         Coach.findOne({ where: { email } })
//             .then(data => {
//                 if (data) {
//                     if (bcrypt.compareSync(password, data.password)) {
//                         req.session.email = data.email
//                         res.redirect('/teams')
//                     } else {
//                         return res.redirect(`login?error=${error}`)
//                     }
//                 } else {
//                     return res.redirect(`login?error=${error}`)
//                 }
//             })
//             .catch(err => {
//                 res.send(err);
//                 console.log(err)
//             })
//     }


//     // static logOut(req, res) {
//     //     res.send("OK")
//     // }

//     // static home(req, res) {
//     //     Championship.findAll()
//     //         .then(data => {
//     //             res.render("championship", { data });
//     //         })
//     //         .catch(err => {
//     //             res.send(err)
//     //         })
//     // }
//     // Kerjakan ini dulu
//     static teams(req, res) {
//         // Team.findAll({
//         //     include: {
//         //         model: User
//         //     }
//         // })
//         //     .then((data) => {
//         //         res.render('team', { data })
//         //     })
//         //     .catch(err => {
//         //         res.send(err)
//         //     })
//         // res.send('holla')
//         res.render('list-team')
//     }


// }
// module.exports = Controller