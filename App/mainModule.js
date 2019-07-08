(function() {
    var dependencies = [
        "ngMessages",
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "satellizer",
        "ngNotify",
        "angular-loading-bar",
        "weatherFront.home",
        "weatherFront.services",
        "weatherFront.directives",
        "weatherFront.authentication",
        "ngCookies",
        "ngMaterial"
    ];
    angular.module("weatherFront.main", dependencies);
})();


(function() {

    var controller = function(vm, $rootScope, authService, $auth, StorageService,  messagingService, $location) {



       if (!authService.isSignedIn()) {
            //$location.path('/login');
        }

        $rootScope.$on('logout', function() {

            var successLogout = function(signInResponse) {
                storageService.remove('user');
                $auth.logout();
                messagingService.displaySuccess('good bye');
                $location.path('/login');
            };

            authService.signOut().then(successLogout, messagingService.displayError);
        });

        $rootScope.$on('cfpLoadingBar:loading', function(event, data) {
            vm.loadingInProgress = true;
        });

        $rootScope.$on('cfpLoadingBar:loaded', function(event, data) {
            vm.loadingInProgress = false;
        });

        //if(isSigned){
            $location.path("/main");
        //}

    }

    //controller.$inject = ["$scope", "$rootScope", "authService", "$auth", "StorageService", "MessagingService", "$location", controller];

    angular.module("weatherFront.main").controller("MainCtrl", ["$scope", "$rootScope", "authService", "$auth", "StorageService", "MessagingService", "$location", controller]);

})();
