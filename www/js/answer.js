'use strict';
  
angular.module('ionicApp', ['ionic'])

.controller('answerCtrl',['$scope','$ionicPopup','$timeout','$interval',function($scope,$ionicPopup,$timeout,$interval){
    // var minutes = 1;
    var now = 0;
    var totalTime = 120;
    var totalNum = 60;
    $scope.aa = 0;
    $scope.bb = 0;
    $scope.cc = 0;
    $scope.dd = 0;

    var totalscore = 0;

    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) 
            return unescape(r[2]); 
        return null; 
    }

    var grade = getQueryString('grade');

    if(getQueryString('selectedTime')&&getQueryString('selectedNum')&&getQueryString('selectedGrade')){
       totalTime = getQueryString('selectedTime');
       totalNum = getQueryString('selectedNum');
       grade = getQueryString('selectedGrade');
    }

    $scope.totalnum = totalNum;
    now = totalTime;

    function showWinConPop() {
        var winPopup = $ionicPopup.alert({
            title: '<strong>提示</strong>',
            template: '恭喜你全部完成！',
        });

        winPopup.then(function(res) {
           console.log('done');
           window.location.href="score.html?score=" + totalscore + "&totalnum=" + totalNum + "&totalTime=" + totalTime  + "&now=" + now  + "&grade=" + grade;
        });
    }

    function showConfirmPop() {
        var confirmPopup = $ionicPopup.confirm({
            title: '<strong>提示</strong>',
            template: '这么简单，竟然没完成！服不服？',
            okText: '不服再战',
            cancelText: '查看战绩'
        });

        confirmPopup.then(function (res) {
            if (res) {
                if(getQueryString('selectedTime')){
                    window.location.href="answer.html?selectedTime=" + totalTime + "&selectedNum=" + totalNum+ "&selectedGrade=" + grade;
                }else{
                    window.location.href="answer.html?grade=" + grade;
                }
            } else {
                // alert(totalscore);
                // alert(totalnum);
                window.location.href="score.html?score=" + totalscore + "&totalnum=" + totalNum + "&totalTime=" + totalTime  + "&now=" + now + "&grade=" + grade;
            }
        });
    }

    var timer = $interval(function(){
        now--;
        if(now>=0){
            $scope.minutes = Math.floor(now/60); 
            $scope.seconds = Math.floor(now%60); 
        }

        if(now == 0 && $scope.totalnum>0){
            $interval.cancel(timer);
            $scope.text = '00:00';
            showConfirmPop();
        }

    },1000);

    function GetRandomNum(Min,Max)
    {   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }

    //从一个给定的数组arr中,随机返回num个不重复项
    function createRandomMan(arr, num) {
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = new Array();
        for (var i = 0; i<num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length>0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array[i] = temp_array[arrIndex];
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    }

    function operation(ope,pos){
        var first;
        var second;
        var third;
        var answer;
        var resultArray = new Array();

        if(grade == 1){
           first = GetRandomNum(1,10);
           second = GetRandomNum(1,10);
        }
        if(grade == 2){
           first = GetRandomNum(10,20);
           second = GetRandomNum(10,20);
        }
        if(grade == 3){
           first = GetRandomNum(10,50);
           second = GetRandomNum(10,50);
        }
        if(grade == 4){
           first = GetRandomNum(10,100);
           second = GetRandomNum(10,100);
        }
        if(grade == 5){
           first = GetRandomNum(50,100);
           second = GetRandomNum(50,100);
        }

        if(ope=='add' || ope=='minus'){
           third = first + second;
        }
        else{
           third = first * second;
        }
     
        
        if(ope=='add'){
            if(pos==1){
               $scope.question = ' ? '+ ' + ' + second + ' = ' +  third;
               answer = first;
            }else if(pos==2){
               $scope.question = first + ' + ' + ' ? ' + ' = ' + third;
               answer = second;
            }
            else{
                $scope.question = first + ' + ' + second + ' = ' +' ? ';
                answer = third;
            }
        }else if(ope=='minus'){
            if(pos==1){
               $scope.question = ' ? '+ ' - ' + second + ' = ' +  first;
               answer = third;
            }else if(pos==2){
               $scope.question = third + ' - ' + ' ? ' + ' = ' + first;
               answer = second;
            }
            else{
                $scope.question = third + ' - ' + second + ' = ' +' ? ';
                answer = first;
            }
        }else if(ope=='plus'){
            if(pos==1){
               $scope.question = ' ? '+ ' x ' + second + ' = ' +  third;
               answer = first;
            }else if(pos==2){
               $scope.question = first + ' x ' + ' ? ' + ' = ' + third;
               answer = second;
            }
            else{
                $scope.question = first + ' x ' + second + ' = ' +' ? ';
                answer = third;
            }
        }
        

        function function1 (Min,Max) {
            var my_array = new Array(); 
            
            for (var i = Min; i < Max+1; i++) //max,min指定范围
            { 
                my_array[i] = i;
            }

            return createRandomMan(my_array,4); 
        }

        resultArray = function1(answer-1,answer+2);
        
        $scope.aa = resultArray[0];
        $scope.bb = resultArray[1];
        $scope.cc = resultArray[2];
        $scope.dd = resultArray[3];

        if($scope.aa == answer)
        {
            $scope.a = function () {
                $scope.totalnum--;
                $("#a").addClass("ion-checkmark-circled");
                totalscore++;
                $timeout(function() {
                   $("#a").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',1);
                }
            }
            $scope.b = function () {
                $scope.totalnum--;
                $("#b").addClass("ion-close-circled");
                $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',2);
                }
            }
            $scope.c = function () {
                $scope.totalnum--;
                $("#c").addClass("ion-close-circled");
                $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',3);
                }
            }
            $scope.d = function () {
                $scope.totalnum--;
                $("#d").addClass("ion-close-circled");
                $timeout(function() {
                   $("#d").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',1);
                }
            }

        }
        else if($scope.bb == answer)
        {
            $scope.a = function () {
                $scope.totalnum--;
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',2);
                }
            }
            $scope.b = function () {
                $scope.totalnum--;
                $("#b").addClass("ion-checkmark-circled");
                totalscore++;
                $timeout(function() {
                   $("#b").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',3);
                }
            }
            $scope.c = function () {
               $scope.totalnum--;
               $("#c").addClass("ion-close-circled"); 
               $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
               if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',1);
                }
            }
            $scope.d = function () {
                $scope.totalnum--;
                $("#d").addClass("ion-close-circled");
                $timeout(function() {
                   $("#d").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',2);
                }
            }

        }else if($scope.cc == answer)
        {
            $scope.a = function () {
                $scope.totalnum--;
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',3);
                }
            }
            $scope.b = function () {
                $scope.totalnum--;
                $("#b").addClass("ion-close-circled");
                $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',1);
                }
            }
            $scope.c = function () {
                $scope.totalnum--;
                $("#c").addClass("ion-checkmark-circled");
                totalscore++;
                $timeout(function() {
                   $("#c").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',2);
                }
            }
            $scope.d = function () {
                $scope.totalnum--;
                $("#d").addClass("ion-close-circled");
                $timeout(function() {
                   $("#d").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',3);
                }
            }

        }else
        {
            $scope.a = function () {
                $scope.totalnum--;
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',1);
                }
            }
            $scope.b = function () {
                $scope.totalnum--;
                $("#b").addClass("ion-close-circled");
                 $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',2);
                }
            }
            $scope.c = function () {
                $scope.totalnum--;
                $("#c").addClass("ion-close-circled");
                $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',3);
                }
            }
            $scope.d = function () {
                $scope.totalnum--;
                $("#d").addClass("ion-checkmark-circled");
                totalscore++;
                $timeout(function() {
                   $("#d").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',1);
                }
            }

        }

    }

    if($scope.totalnum<=0){
       showWinConPop();
    }
    else{
        operation('plus',2);
    }

    $scope.return = function () {
        if (getQueryString('selectedGrade')) {
            window.location.href="mymodel.html";
        }
        else{
            window.location.href="choose.html";
        }
    }
}]);