var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	login : String,
	password : String
}, { collection : 'Users' });

module.exports = mongoose.model('Users', UserSchema);