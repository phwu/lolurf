(function(){
    angular.module("urfApp")
    .controller('BansCtrl', ['$http', '$scope', dashboard])
       
       function dashboard($http, $scope){
       
        $scope.bans = [];
        $scope.totalBans = 1;
        
        $http.get('matchBans/count/all').success(function(data) {
        	$scope.bans = data;
        });

        $http.get('matchBans/count').success(function(data) {
        	$scope.totalBans = data;
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