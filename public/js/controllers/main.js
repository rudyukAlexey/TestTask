(function(){
	
	angular.module('appController', [])
	
			.controller("mainController", ['$http', '$cookies', 'Users', 'Workers',  function($http, $cookies, Users, Workers){
				var app = this;
				app.sortType = "";
				app.sortReverse = false;
				app.searchWorker = "";
				app.users = [];
				app.workers = [];
				app.user = {};
				app.worker = {};
				
				Users.get()
					.success(function(data){
						app.users = data;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				
				Workers.get()
					.success(function(data){
						app.workers = data;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});		
				
				app.isUserExists = function(){
					if(typeof($cookies.get('id')) === "undefined"){
						return false
					} else {
						return true
					}
				};
				
				app.logOff = function(){
					$cookies.remove('id');
				};
				
				app.checkUser = function(){
					for(var i = 0; i < app.users.length; i++){
						if(app.users[i].login == app.user.login && app.users[i].password == app.user.password) {
								$cookies.put('id', app.users[i]._id);
								app.user = {};
						} 
					};
					if(app.isUserExists() == false){
						alert("User is not found");
					};
				};
				
				app.addWorker = function(){					
					Workers.create(app.worker)
							.error(function(data) {
								console.log('Error: ' + data);
							});
					Workers.get()
							.success(function(data){
								app.workers = data;
							})
							.error(function(data) {
								console.log('Error: ' + data);
							});								
					app.worker = {};
				};
				
				app.deleteWorkers = function(){
					for(var i = 0; i < app.workers.length; i++){
						if(app.workers[i].checked == true){
							Workers.delete(app.workers[i]._id)
									.error(function(data) {
										console.log('Error: ' + data);
									});
							Workers.get()
									.success(function(data){
										app.workers = data;
									})
									.error(function(data) {
										console.log('Error: ' + data);
									});	
						}
					}
				};
				
				app.updateWorker = function(updatedWorker){
					Workers.update(updatedWorker)
							.error(function(data) {
								console.log('Error: ' + data);
							});
					Workers.find(updatedWorker._id)
							.success(function(data){
								for(var i = 0; i < app.workers.length; i++){
									if(app.workers[i]._id == updatedWorker._id){
										app.workers[i] = data[0];
									}
								}
							})
							.error(function(data) {
								console.log('Error: ' + data);
							});
					
				};
			}])
			
			
			.directive("loginForm", function(){
				return {
					restrict: "E",
					templateUrl: "./html/login-form.html"
				};
			})
			
			.directive("mainContent", function(){
				return {
					restrict: "E",
					templateUrl: "./html/main-content.html"
				};
			});
})();