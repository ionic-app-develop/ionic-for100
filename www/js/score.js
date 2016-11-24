'use strict';
  
angular.module('ionicApp', ['ionic'])

.controller('scoreCtrl',['$scope',function($scope){

    function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) 
			return unescape(r[2]); 
		return null; 
	}

    var grade = getQueryString('grade');
	var score = getQueryString('score');
	var totalnum = getQueryString('totalnum');
	var totalTime = getQueryString('totalTime');
    var now = getQueryString('now');
    var useTime = totalTime - now;

	$scope.grade = grade;
	$scope.score = score;
	$scope.totalnum = totalnum;
	$scope.minutes = Math.floor(useTime/60);
	$scope.seconds = Math.floor(useTime%60);

}]);