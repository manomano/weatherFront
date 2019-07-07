(function() {
    angular.module("weatherFront.directives", []);
})();

angular.module("weatherFront.directives").directive('forecastItem', function() {
    return {
        require: "ngModel",
        restrict: 'E',
        scope: {
            forecast_info: '=info'
        },
        templateUrl: "App/_Directives/templates/forecastItem.html",
        controller: ['$scope', function($scope) {



        }]

    };
});


angular.module("weatherFront.directives").directive('searchBar', function() {
    return {
        require: "ngModel",
        restrict: 'E',
        scope: {
            forecastArr: '=forecast'
        },
        templateUrl: "App/_Directives/templates/searchBar.html",
        controller: ['$scope', '$rootScope','forecastService', function($scope, $rootScope, forecastService) {
            $scope.city = '';
            $scope.loading = false;
            $scope.retrieve = function () {
                if($scope.city==''){
                    return;
                }
                $scope.loading = true;
                let myscope = $scope;
                forecastService.getDailyForecast($scope.city).then(function (response) {
                    myscope.forecastArr = response.data;
                    myscope.loading = false;
                    $rootScope.$emit('searched',myscope.forecastArr);
                },function (err) {
                    
                });
            }
        }]

    };
})
