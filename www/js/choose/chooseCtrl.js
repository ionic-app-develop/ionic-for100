angular.module('app.ctrl.choose', [])

.controller('chooseCtrl',function($scope, $state, app, choose){ 
    
    $scope.gradeone = function(){
      choose.removeGrade();
      choose.setGrade(1);
      app.removeMark();
      app.setMark(1);
      $state.go('answer');
    };

    $scope.gradetwo = function(){
      choose.removeGrade();
      choose.setGrade(3);
      app.removeMark();
      app.setMark(1);
      $state.go('answer');
    };

    $scope.gradethree = function(){
      choose.removeGrade();
      choose.setGrade(5);
      app.removeMark();
      app.setMark(1);
      $state.go('answer');
    };   

    $scope.return = function(){
      $state.go('index');
    };      
});