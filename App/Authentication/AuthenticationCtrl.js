(function() {

    var controller = function(vm, authService, storageService, messagingService, $location, ngNotify) {

        vm.credentials = {};

        vm.signIn = function() {

            var success = function(response) {
                storageService.saveObject('Authorization', response.data);
                $location.path('/main');
                /*authService.getCurrentUser()
                    .then(function(response) {
                        storageService.saveObject('user', response.data);
                        ngNotify.set('გამარჯობა', 'info');
                        $location.path('/main');
                    }, messagingService.displayError);*/
            };

            authService.signIn(vm.credentials).then(success, messagingService.displayError);
        }

    }

    controller.$inject = ["$scope", "authService", "StorageService", "MessagingService", "$location", "ngNotify"];
    angular.module("weatherFront.authentication").controller("AuthenticationCtrl", controller);
})();
