var app = angular.module('urfApp', ['ngRoute'])

/*.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/main.html',
            controller: 'DemoCtrl',
            activeNav: 'navA'
        })
        .when('/about', {
            templateUrl: '/about.html',
            controller: 'DemoCtrl',
            activeNav: 'navB'
        })
        .otherwise({ redirectTo: '/' });
}])
.controller('DemoCtrl', ['$scope', '$route', function($scope, $route) {
    $scope.route = $route;
}])*/
;
    
    app.controller('DashboardCtlr', function($http, $scope) {
       
        $scope.bans = [];
        $scope.totalBans = 1;
        $scope.duration = [];
        $scope.totalMatches = 0;
        $scope.totalGold = 0;
        $scope.totalKills = 0;
        
        $http.get('bans/count/all').success(function(data) {
        	$scope.bans = data;
        });

        $http.get('bans/count').success(function(data) {
        	$scope.totalBans = data;
        });
        
        $http.get('teamStats/duration').success(function(data) {
        	$scope.duration = data[0];
        });
        
        $http.get('matches/count').success(function(data) {
            $scope.totalMatches = data;
        });
        
        $http.get('playerStats/goldEarned').success(function(data) {
            $scope.totalGold = data[0].total;
        });
        
        $http.get('playerStats/kills').success(function(data) {
            $scope.totalKills = data[0].total;
        });
        
    });

    app.controller('ModalInstanceCtrl', function ($http, $scope, $modalInstance, id) {
        $scope.champId = id;
        $scope.champData = [];
        
        $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+$scope.champId+'?champData=all&api_key=c102f723-48a5-413c-8599-d7fb11046b23').success(function(data) {
            $scope.champData = data; 
        });
        
        $scope.close = function() {
            $modalInstance.close();
        };
    });

    
    app.directive('header', function() {
        return {
            restrict: 'A',
            templateUrl: '/header.html',
        };
    });

    app.directive('footer', function() {
        return {
            restrict: 'A',
            templateUrl: '/footer.html',
        };
    });
    
    app.filter("sanitize", ['$sce', function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }]);
