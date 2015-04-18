(function(){
    angular.module("urfApp")
    .controller('PlayersCtrl', ['$http', '$scope', 'champService','$filter', dashboard])
       
      function dashboard($http, $scope, champService){
       
          $scope.totalDmgTaken = [];
      		$scope.pentaKills = [];
      		$scope.deaths = [];
      		$scope.assists = [];
      		$scope.totalDmgDealtToChamps = [];
      		$scope.largestKillingSpree = [];
      		$scope.minionsKilled = [];
      		$scope.goldEarned = [];
      		$scope.wardsPlaced = [];
      		$scope.killingSprees = [];
      		$scope.kills = [];
      		$scope.totalHeals = [];
      		
      		$scope.champIds = [];
      		$scope.champIdsCountTotal = 1;
      		
      		$scope.tiers = [];
      		$scope.tiersCountTotal = 1;
      		
      		$scope.spell1Ids = [];
      		$scope.spell2Ids = [];
      		$scope.spell1Count = 1;
      		$scope.spell2Count = 1;
  		
  		    $http.get('playerStats/totalDmgTaken').success(function(data) {
          	$scope.totalDmgTaken = data;
          });
          
          $http.get('playerStats/pentaKills').success(function(data) {
          	$scope.pentaKills = data;
          });
          
          $http.get('playerStats/deaths').success(function(data) {
          	$scope.deaths = data;
          });
          
          $http.get('playerStats/assists').success(function(data) {
          	$scope.assists = data;
          });
          
          $http.get('playerStats/totalDmgDealtToChamps').success(function(data) {
          	$scope.totalDmgDealtToChamps = data;
          });
          
          $http.get('playerStats/minionsKilled').success(function(data) {
          	$scope.minionsKilled = data;
          });
          
          $http.get('playerStats/goldEarned').success(function(data) {
          	$scope.goldEarned = data;
          });
          
          $http.get('playerStats/wardsPlaced').success(function(data) {
          	$scope.wardsPlaced = data;
          });
          
          $http.get('playerStats/killingSprees').success(function(data) {
          	$scope.killingSprees = data;
          });
          
          $http.get('playerStats/kills').success(function(data) {
          	$scope.kills = data;
          });
          
          $http.get('playerStats/totalHeals').success(function(data) {
          	$scope.totalHeals = data;
          });
          
          $http.get('playerStats/sumcounts/highestAchievedSeasonTier').success(function(data) {
          	$scope.tiers = data;
          	var count = 0;
          	for (var i = 0; i < data.length; i++) {
          	    count = count + data[i].count;
          	}
          	$scope.tiersCountTotal = count;
          });
          
          $http.get('playerStats/sumcounts/champId').success(function(data) {
          	$scope.champIds = data;
          	var count = 0;
          	for (var i = 0; i < data.length; i++) {
          	    count = count + data[i].count;
          	}
          	$scope.champIdsCountTotal = count;
          });
          
          $http.get('playerStats/sumcounts/spell1Ids').success(function(data) {
          	$scope.spell1Ids = data;
          	var count = 0;
          	for (var i = 0; i < data.length; i++) {
          	    count = count + data[i].count;
          	}
          	$scope.spell1Count = count;
          });
          
          $http.get('playerStats/sumcounts/spell2Ids').success(function(data) {
          	$scope.spell2Ids = data;
          	var count = 0;
          	for (var i = 0; i < data.length; i++) {
          	    count = count + data[i].count;
          	}
          	$scope.spell2Count = count;
          });
          
          // allows id to become name
          $scope.champs = [];
          $scope.spells = [];
          var champs = $scope.champs;
          var spells = $scope.spells;
          $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=c102f723-48a5-413c-8599-d7fb11046b23').success(function(data) {
          	champs = data.data;
          });
          $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell?api_key=c102f723-48a5-413c-8599-d7fb11046b23').success(function(data) {
            spells = data.data;
          });

          $scope.getChampName=function(id){
            champService.getName()
            var name = "NaN";
            for (var c in champs) {
              if(id == champs[c].id) {
                return champs[c].name;
              }
            }
            return name;
          };
          $scope.getSpellName=function(id){
            var name = "NaN";
            for (var s in spells) {
              if(id == spells[s].id) {
                return spells[s].name;
              }
            }
            return name;
          };
                
          
         
          // need to combine spell1 with spell2 
  /*        $scope.spells = [];
          var spellsA = $scope.spell1Ids;
          var spellsB = $scope.spell2Ids;
          for (var i = 0; i < spellsA.length; i++) {
              if(spellsA[i]._id === spellsB[i]._id) {
                  var count = spellsA[i].count + spellsB[i].count;
                  var js = {
                      "_id": spellsA[i],
                      "count": count
                  }
                  $scope.spells.push(js);
              }
          }*/
        
    }
})();