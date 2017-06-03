 angular.module('app.ctrl.index', [])

.controller('for100Ctrl',function($scope, $state, $cordovaToast,$interval,$ionicPopover){

	var lightNum = 0;

	var changeLight = $interval(function(){
	    lightNum++;
	    if (lightNum > 12) {
	        lightNum = 1;
	    }
	    $scope.imgurl = "img/" +lightNum + ".png";
	},150);

	// .fromTemplateUrl() method
	$ionicPopover.fromTemplateUrl("my-popover.html", {
		scope: $scope
		}).then(function(popover) {
			$scope.popover = popover;
	});


	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};

	$scope.closePopover = function() {
		$scope.popover.hide();
	};

	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});

	// Execute action on hide popover
	$scope.$on('popover.hidden', function() {
	// Execute action
	});

	// Execute action on remove popover
	$scope.$on('popover.removed', function() {
	// Execute action
	});

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
                params.message.description = "世界上第一款最让人想吐槽的游戏，快来吐槽一下吧！";
                params.message.thumb = "www/img/app.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
                break;

                case 'send-link-thumb-remote':
                params.message.title = "挑战100";
                params.message.description = "世界上第一款最让人想吐槽的游戏，快来吐槽一下吧！";
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

    $scope.handle = function (scenes,id) {
        share(scenes, id);
    };


	$scope.shareToQQ = function(){
		var args = {};
	    args.url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.for100101788";
	    args.title = "挑战100";
	    args.description = "世界上第一款最让人想吐槽的游戏，快来吐槽一下吧！";
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
	    args.description = "世界上第一款最让人想吐槽的游戏，快来吐槽一下吧！";
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
	    args.description = "世界上第一款最让人想吐槽的游戏，快来吐槽一下吧！";
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

	$scope.choose = function(){
       $state.go('choose');
    };

    $scope.mymodel = function(){
       $state.go('mymodel');
    };

    $scope.set = function(){
        $state.go('settings');
    }; 

    $scope.qrCode = function(){
        $state.go('qrcode');
        $scope.closePopover();
    }; 

    $scope.qrCode_gh = function(){
        $state.go('qrcode_gh');
        $scope.closePopover();
    }; 

    // function onDeviceReady() {
    //     keymob.initFromKeymobService('7030816955638476', true);
    // }

    $scope.showBanner = function(){
    	keymob.initFromKeymobService('7030816955638476', false);
		keymob.showBannerRelation(keymob.AdSize.SMART_BANNER,keymob.AdPosition.BOTTOM_CENTER,2);   
    };

    // $scope.$on('$ionicView.beforeEnter', function(e) {
    //    keymob.initFromKeymobService('7030816955638476', false);
    // });
    
    // $scope.$on('$ionicView.enter', function(e) {
    //    keymob.showBannerRelation(keymob.AdSize.SMART_BANNER,keymob.AdPosition.BOTTOM_CENTER,2);   
    // });

    // $scope.$on('$destroy', function(e) {
    //     keymob.removeBanner();
    // });

    // $scope.showBanner();
});