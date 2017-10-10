var express = require('express');
var router = express.Router();
var User = require('../models/user')
var bcrypt = require('bcrypt')


/* POST login or signup */
router.post('/', function(req, res, next) {
  console.log('from /login', req.body)
  if (req.body.state.viewing === 'signup') {
    console.log('viewing signup')
    // new user is signing up
    User.findOne({ email: req.body.state.email }, (err, response) => {
      if (!err) {
        console.log('response from user.findOne', response)
        if (response) {
          // user exists
          res.json({
            message: 'email exists',
            created: false,
            code: 'email_already_exists'
          })
        }
        if (!response) {
          // hash password and create new user
          bcrypt.hash(req.body.state.password, 5, function(err, hash) {
            console.log('password hashed', hash)
            let user = new User({
              email: req.body.state.email,
              password: hash,
              created_date: new Date()
            })
            user.save((err) => {
              if (!err) {
                console.log('res', user)
                res.json({
                  message: 'user created',
                  created: true,
                  code: 'ok'
                })
              }
            })
          });
        }
      } else {
        throw new Error('error signing up')
      }
    })
  } else {
    // user wants to login
    console.log('viewing login')
    User.findOne({ email: req.body.state.email }, (err, response) => {
      if (!response) {
        res.json({ message: 'email does not exist', code: 'no_email_found' })
        return;
      }
      if (!err) {
        bcrypt.compare(req.body.state.password, response.password, function(err, hashMatch) {
          if (hashMatch) {
           res.json({
             message: 'valid credentials',
             code: 'ok'
           })
          } else {
           res.json({
             message: 'wrong password',
             code: 'wrong_password'
           })
          }
        }) // end of bcrypt.compare
      }
    }) // end of User.findOne
  } // end of else block
});

module.exports = router;
