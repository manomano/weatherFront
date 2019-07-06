(function() {

	var storageService = function($window) {

		this.setvalue = function(key, value) {
			$window.sessionStorage.setItem(key, value);
		}

		this.getValue = function(key) {
			return $window.sessionStorage.getItem(key);
		}

		this.saveObject = function(key, object) {
			this.setvalue(key, JSON.stringify(object));
		}

		this.getObject = function(key) {
			return JSON.parse(this.getValue(key));
		}

		this.remove = function(key) {
			$window.sessionStorage.removeItem(key);
		}
	}
	storageService.$inject = ["$window"];
	angular.module("weatherFront.services").service("StorageService", storageService);

})();
