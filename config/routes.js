var Users = require('./models/user-model');
var Workers = require('./models/worker-model');


module.exports = function (app) {
	
	app.get('/api/users', function(req, res) {
        Users.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

	app.get('/api/workers', function(req, res) {
		Workers.find(function(err, workers) {
		if (err)
			res.send(err)
		res.json(workers);
		});
	});
	
	app.get('/api/workers/:worker_id', function(req, res) {
		Workers.find({_id : req.params.worker_id},function(err, worker) {
		if (err)
			res.send(err)
		res.json(worker);
		});
	});
		
	app.post('/api/workers', function(req, res) {
        Workers.create({
            firstName : req.body.firstName,
			lastName : req.body.lastName,
			position : req.body.position
        }, function(err, worker) {
            if (err){
                res.send(err);
			}
		});
    });
	
	app.post('/api/workers/:worker_id', function(req, res){
		Workers.findOneAndUpdate({
			_id : req.params.worker_id
			}, {
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				position : req.body.position
			}, function(err, worker) {
            if (err)
                res.send(err);
		});
	});
	
	app.delete('/api/workers/:worker_id', function(req, res) {
        Workers.remove({
            _id : req.params.worker_id
        }, function(err, user) {
            if (err){
                res.send(err);
			}
        });
    });
	
	app.get('*', function(req, res){
		res.sendFile('./public/index.html');
	});
};