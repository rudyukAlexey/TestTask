var mongoose = require('mongoose');

var WorkerSchema = new mongoose.Schema({
	firstName : String,
	lastName : String,
	position : String,
}, { collection : 'Workers' });

module.exports = mongoose.model('Workers', WorkerSchema);