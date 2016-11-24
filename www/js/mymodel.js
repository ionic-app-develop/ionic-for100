
'use strict';
  
angular.module('ionicApp', ['ionic','ionic-modal-select'])

.controller('mymodelCtrl',['$scope',function($scope){
	$scope.selectTime =  ["30", "60", "90", "120", "150","180","210", "240","300",
      ];
    $scope.selectNum =  ["10", "20", "50", "100", "150","200","250", "300","350","400", "450","500",
      ];
    $scope.selectGrade =  ["1", "2", "3", "4", "5",
      ];

	$scope.selectedTime = '30';
	$scope.selectedNum = '10';
	$scope.selectedGrade = '1';

    $scope.sure = function(selectedTime,selectedNum,selectedGrade){
       window.location.href="answer.html?selectedTime=" + selectedTime + "&selectedNum=" + selectedNum+ "&selectedGrade=" + selectedGrade;
    } 
}]);