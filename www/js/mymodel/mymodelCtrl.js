angular.module('app.ctrl.mymodel', [])

.controller('mymodelCtrl',function($scope, $state, app, mymodel){
    $scope.langkey = app.getLangkey().replace(/^\"|\"$/g,'');

  	$scope.selectTime =  [30, 60, 90, 120, 150, 180, 210, 240, 300
      ];
    $scope.selectNum =  [10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500
      ];
    $scope.selectGrade =  [1, 2, 3, 4, 5
      ];

  	$scope.selectedTime = 30;
  	$scope.selectedNum = 10;
  	$scope.selectedGrade = 1;

    $scope.selectedTime1 = 30;
    $scope.selectedNum1 = 10;
    $scope.selectedGrade1 = 1;

    $scope.sure = function(selectedTime,selectedNum,selectedGrade){
      mymodel.removeTime();
      mymodel.removeNum();
      mymodel.removeGrade();
      app.removeMark();

      mymodel.setTime(selectedTime);
      mymodel.setNum(selectedNum);
      mymodel.setGrade(selectedGrade);
      app.setMark(2);
      $state.go('answer');
    }; 

    $scope.sure1 = function(selectedTime1,selectedNum1,selectedGrade1){
      mymodel.removeTime();
      mymodel.removeNum();
      mymodel.removeGrade();
      app.removeMark();

      mymodel.setTime(selectedTime1);
      mymodel.setNum(selectedNum1);
      mymodel.setGrade(selectedGrade1);
      app.setMark(2);
      $state.go('answer');
    }; 

    $scope.return = function(){
       $state.go('index');
    };   
});