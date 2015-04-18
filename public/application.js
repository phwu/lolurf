(function(){
    angular.module('urfApp', ['ngRoute','googlechart'])
    .config(['$routeProvider', router])
    .controller('HeaderCtrl', ['$scope', '$location', header])
    ;
    
    
      
    function header($scope, $location) {
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    }
    
    function router($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: '/dashboard/dashboardPartial.html',
            controller : 'DashboardCtrl'
        })
        .when('/bans', {
            templateUrl: '/bans/bansPartial.html',
            controller : 'BansCtrl'
        })
        .when('/about', {
            templateUrl: '/about/aboutPartial.html'
        })
        .when('/teams', {
            templateUrl: '/teams/teamsPartial.html',
            controller : 'TeamsCtrl'
        })
        .when('/players', {
            templateUrl: '/players/playersPartial.html',
            controller : 'PlayersCtrl'
        })
        .otherwise({ redirectTo: '/' });
    }
})();
    
//     app.filter("sanitize", ['$sce', function($sce) {
//       return function(htmlCode){
//         return $sce.trustAsHtml(htmlCode);
//       }
//     }]);
