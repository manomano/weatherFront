(function() {

    var forecastService = function($auth, http, $location,StorageService, $rootScope,$cookies) {

        this.getDailyForecast = function(city) {

            return http.post(apiURL + 'weather/daily/' + city+"/",{allow:true});
        }

        this.loadRecentSearches = function () {
            let recentSearches = $cookies.get('recentSearches')
            if(recentSearches){
                $rootScope.recentSearches = JSON.parse(recentSearches);
            }else{
                $rootScope.recentSearches = []
            }

        }



    }
//    forecastService.$inject =  ["$auth", "$http", "$location","StorageService", "$rootScope", "$cookies",forecastService];

    angular.module("weatherFront.services").service("forecastService", ["$auth", "$http", "$location","StorageService", "$rootScope", "$cookies",forecastService]);

})();
