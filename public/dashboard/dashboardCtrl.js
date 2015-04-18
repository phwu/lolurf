(function(){
    angular.module("urfApp")
    .controller('DashboardCtrl', ['$http', '$scope', dashboard])
       
       function dashboard($http, $scope){
       
        $scope.totalBans = 1;
        $scope.duration = [];
        $scope.totalMatches = 0;
        $scope.totalGold = 0;
        $scope.totalKills = 0;
        $scope.topChamp = [];

        $http.get('/matchBans/count').success(function(data) {
        	$scope.totalBans = data;
        });
        
        $http.get('/teamStats/duration').success(function(data) {
        	$scope.duration = data[0];
        });
        
        $http.get('/matches/count').success(function(data) {
            $scope.totalMatches = data;
        });
        
        $http.get('/playerStats/goldEarned').success(function(data) {
            $scope.totalGold = data[0].total;
        });
        
        $http.get('/playerStats/kills').success(function(data) {
            $scope.totalKills = data[0].total;
        });
        
        $http.get('playerStats/sumcounts/champId').success(function(data) {
          	$scope.topChamp = data[0];
        });
        
        // allows id to become name
          $scope.champs = [];
          var champs = $scope.champs;
          $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=c102f723-48a5-413c-8599-d7fb11046b23').success(function(data) {
          	champs = data.data;
          });

          $scope.getChampName=function(id){
            var name = "NaN";
            for (var c in champs) {
              if(id == champs[c].id) {
                return champs[c].name;
              }
            }
            return name;
          };
        
    }
})();