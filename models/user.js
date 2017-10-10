var mongoose = require('mongoose')

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true, max: 50 },
    created_date: Date,
    password: { type: String, required: true },
    login_date: Date,
    answers: Array
});

// Compile model from schema
var UserModel = mongoose.model('UserModel', UserSchema );

module.exports = UserModel
