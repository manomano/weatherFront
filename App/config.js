const prefix = '';
const apiURL = "http://localhost:3000/api/";
const HTTP_RESOURCES = {
    BASE: prefix + "Api/",
    AUTH: apiURL + "auth/"
};

(function() {



    angular.module("weatherFront.main").config(function($authProvider) {
        $authProvider.tokenName = 'accessToken';
        $authProvider.storageType = 'sessionStorage';
        //$authProvider.tokenHeader = 'Authorization';
        //$authProvider.tokenType = 'Bearer';
        $authProvider.tokenPrefix = 'dada';
        $authProvider.loginUrl = HTTP_RESOURCES.AUTH + 'login';
    })
        // .config(function($mdThemingProvider) {
        //     $mdThemingProvider.theme('default')
        //         .primaryPalette('teal', {
        //             'default': '400',
        //             'hue-1': '300',
        //             'hue-2': '200'
        //         })
        //         .accentPalette('red', {
        //             'default': '500'
        //         })
        //         .warnPalette('lime')
        //     //.dark(); // :)
        // })

        .config([
            'cfpLoadingBarProvider',
            function(cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeSpinner = true;
                cfpLoadingBarProvider.latencyThreshold = 100;
                cfpLoadingBarProvider.parentSelector = '#datacon-loading-bar-container';
            }
        ])
        .config([
            '$compileProvider',
            function($compileProvider) {
                $compileProvider.debugInfoEnabled(true);
            }
        ]).config([
        '$locationProvider',
        function ($locationProvider) {


        }
    ]).config(['$httpProvider', function($httpProvider) {

        // $httpProvider.defaults.useXDomain = true;
        //
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

    ]);

})();




(function() {
    var routeConfig = function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: prefix + "App/home.html",
                controller: "MainCtrl"
            })
            .when("/login", {
                templateUrl: prefix + "App/Authentication/authentication.html",
                controller: "AuthenticationCtrl"
            }).when("/main", {
                templateUrl: prefix + "App/home/home.html",
                controller: "homeCtrl"
            });

    };

    routeConfig.$inject = ["$routeProvider"]
    angular.module("weatherFront.main").config(routeConfig);
})();
