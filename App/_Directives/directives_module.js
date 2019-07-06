(function() {
    angular.module("weatherFront.directives", []);
})();



angular.module("weatherFront.directives").directive('searchBar', function() {
    return {
        require: "ngModel",
        restrict: 'E',
        scope: {
            forecastArr: '=forecast'
        },
        templateUrl: "App/_Directives/templates/searchBar.html",
        controller: ['$scope','forecastService', function($scope, forecastService) {
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
                },function (err) {
                    
                });


                // myscope.forecastArr = [{a:1}, {a:2}];
                // function assign(){
                //     myscope.forecastArr = [{a:1}, {a:2}];
                //     myscope.loading = false;
                // }
                //
                // setTimeout(assign, 2000);


            }
        }]

    };
})
