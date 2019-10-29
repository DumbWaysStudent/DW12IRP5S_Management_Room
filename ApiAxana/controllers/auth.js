const jwt = require('jsonwebtoken')
const Sequelize = require("sequelize");
const models = require('../models')
const User = models.user
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!

    User.findOne({ where: { email } }).then(user => {
        const authorization = bcrypt.compareSync(password, user.password) // autenttikasi email dan password
        if (authorization) {
            const token = jwt.sign({ userId: user.id }, 'my-secret-key')
            res.send({

                login: "succes",
                user,
                token
            })
        } else {
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
        .catch(err => {
            res.send({
                login: false,
                message: "Invalid, You are not registered"
            });
        });
}
exports.register = (req, res) => {
    const { email, password } = req.body
    User.findOrCreate({
        where: { email },
        defaults: { email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) },
    }).then(([user, created]) => {
        if (created) {
            const token = jwt.sign({ userId: user.id }, 'my-secret-key')
            res.send({ login: "succes", token })
        } else {
            res.send({ error: true, message: "Email is already used", email: user.email })
        }
    })
}
