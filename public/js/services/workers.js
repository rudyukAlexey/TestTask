(function(){
	
	angular.module('workerService', [])

			.factory('Workers', ['$http',function($http) {
				return {
					get : function() {
						return $http.get('/api/workers');
					},
					find : function(id) {
						return $http.get('/api/workers/' + id);
					},
					create : function(worker) {
						return $http.post('/api/workers', worker);
					},
					update : function(worker) {
						return $http.post('/api/workers/' + worker._id, worker);
					},
					delete : function(id) {
						return $http.delete('/api/workers/' + id);
					}
				}
			}]);
})();