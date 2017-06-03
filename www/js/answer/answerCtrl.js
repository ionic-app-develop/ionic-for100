angular.module('app.ctrl.answer',[])

.controller('answerCtrl',function($scope,$ionicPopup,$timeout,$interval,$state,app,choose,mymodel,score){
    var now = 0;
    var totalTime = 60;
    var totalNum = 20;
    $scope.aa = 0;
    $scope.bb = 0;
    $scope.cc = 0;
    $scope.dd = 0;

    var totalscore = 0;

    var grade = choose.getGrade();

    var langkey = app.getLangkey().replace(/^\"|\"$/g,'');


    if(mymodel.getTime()&&mymodel.getNum()&&mymodel.getGrade()){
       totalTime = mymodel.getTime();
       totalNum = mymodel.getNum();
       grade = mymodel.getGrade();
    }

    $scope.totalnum = totalNum;
    now = totalTime;

    var audioStart = new Audio();
    var audioDone = new Audio();
    var audioYes = new Audio();
    var audioWrong = new Audio();
    var audioWarning = new Audio();
    
    function InitSpeakYes() {
        var zhText = "对";
        zhText = encodeURI(zhText);
        audioYes.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=\" ' + zhText + '\"';
        audioYes.type = 'audio/mpeg';  
    }

    function InitSpeakWrong() {
        var zhText = "错";
        zhText = encodeURI(zhText);
        audioWrong.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=\" ' + zhText + '\"';
        audioWrong.type = 'audio/mpeg';
    }

    function InitSpeakWarning() {
        var zhText = "注意啦，还剩最后10秒";
        zhText = encodeURI(zhText);
        audioWarning.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=\" ' + zhText + '\"';
        audioWarning.type = 'audio/mpeg';
    }

    function InitSpeakStart() {
        var zhText = "答题开始";
        zhText = encodeURI(zhText);
        audioStart.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=\" ' + zhText + '\"';
        audioStart.type = 'audio/mpeg';
    }

    function InitSpeakDone() {
        var zhText = "答题结束";
        zhText = encodeURI(zhText);
        audioDone.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=\" ' + zhText + '\"';
        audioDone.type = 'audio/mpeg';
    }

    InitSpeakStart();
    InitSpeakYes();
    InitSpeakWrong();
    InitSpeakWarning();
    InitSpeakDone();

    audioStart.play();

    function showConfirmPop() {
        var confirmPopup;
        if(langkey=='en'){
            confirmPopup = $ionicPopup.confirm({
                title: '<strong>tips</strong>',
                template: 'so easy, come on！',
                okText: 'fight again',
                cancelText: 'my score'
            });
        }
        else{
            confirmPopup = $ionicPopup.confirm({
                title: '<strong>提示</strong>',
                template: '这么简单，竟然没完成！',
                okText: '不服再战',
                cancelText: '查看战绩'
            });
        }

        confirmPopup.then(function (res) {
            if (res) { 
                $state.go('answer',{},{reload:true});
            } else {
                score.removeScore();
                score.removeTime();
                score.removeNum();
                score.removeGrade();

                score.setScore(totalscore);
                score.setTime(totalTime);
                score.setNum(totalNum);
                score.setNow(now);
                score.setGrade(grade);
                $state.go('score');
            }
        });
    }

    var timer = $interval(function(){
        now--;
        if(now>=0){
            $scope.minutes = Math.floor(now/60); 
            $scope.seconds = Math.floor(now%60); 
        }

        if(now === 0 && $scope.totalnum>0){
            audioDone.play();
            $interval.cancel(timer);
            $scope.text = '00:00';
            showConfirmPop();
        }

    },1000);

    function showWinConPop() {
        audioDone.play();
        clearInterval(timer);
        var winPopup;

        if(langkey=='en'){
            winPopup = $ionicPopup.alert({
            title: '<strong>tips</strong>',
            template: ' congratulations！',
            });
        }
        else{
            winPopup = $ionicPopup.alert({
            title: '<strong>提示</strong>',
            template: '恭喜你全部完成！',
            });
        }

        winPopup.then(function(res) {
            console.log('done');
            score.removeScore();
            score.removeTime();
            score.removeNum();
            score.removeGrade();
            
            score.setScore(totalscore);
            score.setTime(totalTime);
            score.setNum(totalNum);
            score.setNow(now);
            score.setGrade(grade);
            console.log(score);
            $state.go('score');
        });
    }

    function GetRandomNum(Min,Max)
    {   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }

    //从一个给定的数组arr中,随机返回num个不重复项
    function createRandomMan(arr, num) {
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = [];
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = [];
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
        var resultArray = [];

        if(grade == 1){
           first = GetRandomNum(1,10);
           second = GetRandomNum(1,10);
        }
        if(grade == 2){
           first = GetRandomNum(1,10);
           second = GetRandomNum(10,20);
        }
        if(grade == 3){
           first = GetRandomNum(10,20);
           second = GetRandomNum(10,20);
        }
        if(grade == 4){
           first = GetRandomNum(10,20);
           second = GetRandomNum(10,50);
        }
        if(grade == 5){
           first = GetRandomNum(10,50);
           second = GetRandomNum(10,100);
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
            var my_array = []; 
            
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
                audioYes.play();
                $timeout(function() {
                   $("#a").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',4);
                }
            };
            $scope.b = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#b").addClass("ion-close-circled");
                $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',3);
                }
            };
            $scope.c = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#c").addClass("ion-close-circled");
                $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',2);
                }
            };
            $scope.d = function () {
                $scope.totalnum--;
                audioWrong.play();
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
            };

        }
        else if($scope.bb == answer)
        {
            $scope.a = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',4);
                }
            };
            $scope.b = function () {
                $scope.totalnum--;
                $("#b").addClass("ion-checkmark-circled");
                totalscore++;
                audioYes.play();
                $timeout(function() {
                   $("#b").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',3);
                }
            };
            $scope.c = function () {
               $scope.totalnum--;
               audioWrong.play();
               $("#c").addClass("ion-close-circled"); 
               $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
               if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',2);
                }
            };
            $scope.d = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#d").addClass("ion-close-circled");
                $timeout(function() {
                   $("#d").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',1);
                }
            };

        }else if($scope.cc == answer)
        {
            $scope.a = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',4);
                }
            };
            $scope.b = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#b").addClass("ion-close-circled");
                $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',3);
                }
            };
            $scope.c = function () {
                $scope.totalnum--;
                $("#c").addClass("ion-checkmark-circled");
                totalscore++;
                audioYes.play();
                $timeout(function() {
                   $("#c").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',2);
                }
            };
            $scope.d = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#d").addClass("ion-close-circled");
                $timeout(function() {
                   $("#d").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('add',1);
                }
            };

        }else
        {
            $scope.a = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#a").addClass("ion-close-circled");
                $timeout(function() {
                   $("#a").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',4);
                }
            };
            $scope.b = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#b").addClass("ion-close-circled");
                $timeout(function() {
                   $("#b").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',3);
                }
            };
            $scope.c = function () {
                $scope.totalnum--;
                audioWrong.play();
                $("#c").addClass("ion-close-circled");
                $timeout(function() {
                   $("#c").removeClass("ion-close-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('minus',2);
                }
            };
            $scope.d = function () {
                $scope.totalnum--;
                $("#d").addClass("ion-checkmark-circled");
                totalscore++;
                audioYes.play();
                $timeout(function() {
                   $("#d").removeClass("ion-checkmark-circled"); // 0.5秒后关闭弹窗
                }, 300);
                if($scope.totalnum<=0){
                   showWinConPop();
                }
                else{
                    operation('plus',1);
                }
            };

        }

    }

    if($scope.totalnum<=0){
       showWinConPop();
    }
    else{
        operation('plus',4);
    }

    $scope.return = function () {
        $interval.cancel(timer);
        if (app.getMark()==2) {
            $state.go('mymodel');
        }
        else{
            $state.go('choose');
        }
    };
});