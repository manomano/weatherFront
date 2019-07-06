(function () {

    var homeController = function($rootScope, $scope, StorageService, MessagingService, $location, $rootScope){

        $scope.forecastArr = [];



    }

    homeController.$inject = ["$rootScope", "$scope", "StorageService", "MessagingService", "$location","$rootScope"];

    angular.module("weatherFront.home").controller("homeCtrl", homeController);


})();
