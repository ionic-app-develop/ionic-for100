angular.module('app.ctrl.qrcode_gh', [])
.controller('qrcode_ghCtrl',function($scope, $state){ 
    // your code; 
    $scope.return = function(){
       $state.go('index');
    };   
});
