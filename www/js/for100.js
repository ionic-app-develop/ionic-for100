'use strict';
  
angular.module('ionicApp', ['ionic'])

.controller('for100Ctrl',['$scope','$interval',function($scope,$interval){
    var lightNum = 0;

    var changeLight = $interval(function(){
        lightNum++;
        if (lightNum > 12) {
            lightNum = 1;
        }
        $scope.imgurl = "img/" +lightNum + ".png";
    },150);
    
}]);