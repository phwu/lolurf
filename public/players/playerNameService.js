(function(){
    angular.module("urfApp")
        .factory("champService", champ);
        
        function champ(){
            
            return {
                getName : function(id){
                    //console.log("calling Champ name service");
                }
            }
        }
})();