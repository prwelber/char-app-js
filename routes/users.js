var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({}, (err, response) => {
    res.json(response)
  })
});

module.exports = router;
