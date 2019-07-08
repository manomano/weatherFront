(function () {

    var homeController = function($rootScope, $scope, forecastService, MessagingService, $location,$cookies){

        $scope.forecastArr = null;
        forecastService.loadRecentSearches();
        $scope.recentSearchesLocal = $rootScope.recentSearches;


        $scope.getRecent = function(event, rec){
            event.preventDefault();
            $scope.forecastArr = rec
        }

        $rootScope.$on('searched',function (event, data) {

            if(!$rootScope.recentSearches){
                $rootScope.recentSearches = [];
            }

            const found = $rootScope.recentSearches.find(x=>x.location.name==data.location.name && x.forecast[0].date ==data.forecast[0].date)
            if(found){
                return;
            }

            if($rootScope.recentSearches.length==5){
                $rootScope.recentSearches.shift();
            }
            $rootScope.recentSearches.push(data);

           // $cookies.remove("recentSearches");
            $cookies.put("recentSearches", JSON.stringify($rootScope.recentSearches));

            console.log($scope.recentSearchesLocal)

        });



    }

    //homeController.$inject = ["$rootScope", "$scope", "forecastService", "MessagingService", "$location","$cookies",homeController];

    angular.module("weatherFront.home").controller("homeCtrl", ["$rootScope", "$scope", "forecastService", "MessagingService", "$location","$cookies",homeController]);


})();
