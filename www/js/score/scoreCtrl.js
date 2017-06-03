angular.module('app.ctrl.score', [])

.controller('scoreCtrl',function($scope,$state,$ionicActionSheet,$cordovaToast,score,app){
    var grade = score.getGrade().replace(/^\"|\"$/g,'');
	var totalscore = score.getScore();
	var totalnum = score.getNum().replace(/^\"|\"$/g,'');
	var totalTime = score.getTime().replace(/^\"|\"$/g,'');
    var now = score.getNow();
    var useTime = totalTime - now;

	$scope.grade = grade;
	$scope.score = totalscore;
	$scope.totalnum = totalnum;
	$scope.minutes = Math.floor(useTime/60);
	$scope.seconds = Math.floor(useTime%60);
	$scope.totalscore = Math.floor($scope.score*100/$scope.totalnum);

	$scope.scenes = [
    {
        label: "会话",
        value: 0
    },
    {
        label: "朋友圈",
        value: 1
    },
    {
        label: "收藏",
        value: 2
    }
    ];

    function share(scene, id) {
        if (typeof Wechat === "undefined") {
            alert("您还没有安装微信。");
            return false;
        }

        var params = {
            scene: scene
        };

        if (id == 'send-text') {
            params.text = "主人，你快回来。";
        } else {
            params.message = {
                title: "[挑战100]" + id,
                description: "[挑战100]",
                mediaTagName: "挑战100",
                messageExt: "挑战100",
                messageAction: "<action>挑战100</action>",
                media: {}
            };

             switch (id) {
                case 'check-installed':
                Wechat.isInstalled(function (installed) {
                    alert("Wechat installed: " + (installed ? "Yes" : "No"));
                });
                return true;

                case 'send-photo-local':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "www/img/for100.jpg";
                break;

                case 'send-photo-remote':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "http://h.hiphotos.baidu.com/image/w%3D310/sign=0728dceacbfdfc03e578e5b9e43e87a9/faedab64034f78f038e2b0e771310a55b3191c3c.jpg";
                break;

                case 'send-link-thumb-local':
                params.message.title = "挑战100";
                params.message.description = "我在挑战100得了" + $scope.totalscore + "分，求超越！";
                params.message.thumb = "www/img/app.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
                break;

                case 'send-link-thumb-remote':
                params.message.title = "挑战100";
                params.message.description = "我在挑战100得了" + $scope.totalscore + "分，求超越！";
                params.message.thumb = "http://www-mobile.stor.sinaapp.com/577471a02a47c.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
                break;

                default:
                alert(id + " can not be recognized!");
                return false;
            }

        }
        Wechat.share(params, function () {
            // alert("Success");
            $cordovaToast.showLongBottom('分享成功').then(function(success) {  
		    console.log("success");    
		  }, function (error) {  
		    // error  
		  });
        }, function (reason) {
            // alert("Failed: " + reason);
            $cordovaToast.showLongBottom('您取消了分享').then(function(success) {  
		    console.log("success");  
		  }, function (error) {  
		    // error  
		  });  
        });
        return true;
    }

    var handle = function (scenes,id) {
        share(scenes, id);
    };


	$scope.shareToQQ = function(){
		var args = {};
	    args.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
	    args.title = "挑战100";
	    args.description = "我在挑战100得了" + $scope.totalscore + "分，求超越！";
	    args.imageUrl = "http://www-mobile.stor.sinaapp.com/577471a02a47c.png";
	    args.appName = "挑战100";
	    YCQQ.shareToQQ(function () {
	      // alert("share success");
	      $cordovaToast.showLongBottom('分享成功').then(function(success) {  
		    console.log("success");    
		  }, function (error) {  
		    // error  
		  });
	    }, function (failReason) {
	      // alert(failReason);
	      $cordovaToast.showLongBottom('您取消了分享').then(function(success) {  
		    console.log("success");  
		  }, function (error) {  
		    // error  
		  });  
	    }, args);
	};

	$scope.shareToQzone = function(){
		var args = {};
	    args.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
	    args.title = "挑战100";
	    args.description = "我在挑战100得了" + $scope.totalscore + "分，求超越！";
	    var imgs =['http://www-mobile.stor.sinaapp.com/577471a02a47c.png'];
	    args.imageUrl = imgs;
	    YCQQ.shareToQzone(function () {
	      // alert("share success");
	      $cordovaToast.showLongBottom('分享成功').then(function(success) {  
		    console.log("success");  
		  }, function (error) {  
		    // error  
		  });
	    }, function (failReason) {
	      // alert(failReason);
		  $cordovaToast.showLongBottom('您取消了分享').then(function(success) {  
		    console.log("success");  
		  }, function (error) {  
		    // error  
		  });  
		}, args);
	};

	$scope.shareToWeibo = function(){
		var args = {};
	    args.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
	    args.title = "挑战100";
	    args.description = "我在挑战100得了" + $scope.totalscore + "分，求超越！";
	    args.imageUrl = "http://www-mobile.stor.sinaapp.com/577471a02a47c.png";//if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
	    args.defaultText = "";
	    YCWeibo.shareToWeibo(function () {
	    // alert("share success");
	    $cordovaToast.showLongBottom('分享成功').then(function(success) {  
		    console.log("success");   
		  }, function (error) {  
		    // error  
		  });
	    }, function (failReason) {
	      // alert(failReason);
	      $cordovaToast.showLongBottom('您取消了分享').then(function(success) {
		    // success
		    console.log("success"); 
		  }, function (error) {
		    // error
		  });
	  }, args);
	};

	$scope.show = function() {
        var langkey = app.getLangkey().replace(/^\"|\"$/g,'');
        var compareKey = "en";
        var hideSheet;
		if(langkey==compareKey){
		    hideSheet = $ionicActionSheet.show({
		        buttons: [
		        { text: 'share2wechat' },
		        { text: 'wechat circle' },
		        { text: 'share2QQ' },
		        { text: 'share2Qzone' },
		        { text: 'share2weibo' }
		        ],
		        titleText: 'share my score',
		        cancelText: 'cancel',
		        cancel: function() {
		           // add cancel code..
		         },
		        buttonClicked: function(index) {
		        	if(index===0){
	                   handle('0','send-link-thumb-local');
		        	}
		        	if(index==1){
		        		handle('1','send-link-thumb-local');
		        	}
		        	if(index==2){
		        		$scope.shareToQQ();
		        	}
		        	if(index==3){
		        		$scope.shareToQzone();
		        	}
		        	if(index==4){
		        		$scope.shareToWeibo();
		        	}
		            return true;
		        }
		    });
		}
		else{
            hideSheet = $ionicActionSheet.show({
		        buttons: [
		        { text: '分享给微信好友' },
		        { text: '分享到微信朋友圈' },
		        { text: '分享给QQ好友' },
		        { text: '分享到QQ空间' },
		        { text: '分享到新浪微博' }
		        ],
		        titleText: '炫耀一下',
		        cancelText: '取消',
		        cancel: function() {
		           // add cancel code..
		         },
		        buttonClicked: function(index) {
		        	if(index===0){
	                   handle('0','send-link-thumb-local');
		        	}
		        	if(index==1){
		        		handle('1','send-link-thumb-local');
		        	}
		        	if(index==2){
		        		$scope.shareToQQ();
		        	}
		        	if(index==3){
		        		$scope.shareToQzone();
		        	}
		        	if(index==4){
		        		$scope.shareToWeibo();
		        	}
		            return true;
		        }
		    });
		}
	};

	$scope.return = function(){
       $state.go('index');
    };     
});