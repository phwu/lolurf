(function(){
    angular.module("urfApp")
    .controller('TeamsCtrl', ['$http', '$scope', dashboard])
       
       function dashboard($http, $scope){
       
        $scope.towerKills = [];
        $scope.dragonKills = [];
        $scope.baronKills = [];
        $scope.duration = [];
        $scope.winner = [];
        
        $http.get('teamStats/towerKills').success(function(data) {
        	$scope.towerKills = data;
        });

        $http.get('teamStats/dragonKills').success(function(data) {
        	$scope.dragonKills = data;
        });
        
        $http.get('teamStats/baronKills').success(function(data) {
        	$scope.baronKills = data;
        });
        
        $http.get('teamStats/duration').success(function(data) {
        	$scope.duration = data[0];
        });
        
        $http.get('teamStats/winner').success(function(data) {
        	$scope.winner = data;
        });
        
    }
})();