angular.module('app.ctrl.qrcode', [])
.controller('qrcodeCtrl',function($scope, $state){ 
    // your code; 
    $scope.return = function(){
       $state.go('index');
    };   
});
