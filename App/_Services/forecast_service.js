(function() {

    var forecastService = function($auth, http, $location,StorageService) {

        this.getDailyForecast = function(city) {

            return http.post(apiURL + 'weather/daily/' + city+"/",{allow:true});
        }



    }
    forecastService.$inject =  ["$auth", "$http", "$location","StorageService"];

    angular.module("weatherFront.services").service("forecastService", forecastService);

})();
