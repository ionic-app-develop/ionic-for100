// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app.ctrl.settings',[])

.controller('settingsCtrl', function($scope, $state, $translate, app){
    var mylangkey;
    $scope.changeLanguage = function (langkey) {
　　　　$translate.use(langkey);
        if(langkey=='en'){
            $("#en").addClass("ion-checkmark-circled");
            $("#zh").removeClass("ion-checkmark-circled");
            app.removeLangkey();
            app.setLangkey('en');
        }
        else{
            $("#zh").addClass("ion-checkmark-circled");
            $("#en").removeClass("ion-checkmark-circled");
            app.removeLangkey();
            app.setLangkey('zh');
        }
　　};
    
    // alert(app.getLangkey());
     
    mylangkey = app.getLangkey().replace(/^\"|\"$/g,'');

    if(mylangkey=='en'){
        $("#en").addClass("ion-checkmark-circled");
    }
    else{
        $("#zh").addClass("ion-checkmark-circled");
    }

    $scope.return = function(){
       $state.go('index');
    };

    function onAdReceive(message) {
        if (message.adtype == keymob.AdTypes.INTERSTITIAL) {
            keymob.showInterstitial();
        }
        if (message.adtype == keymob.AdTypes.APPWALL) {
            keymob.showAppWall();
        }
        if (message.adtype == keymob.AdTypes.VIDEO) {
            keymob.showVideo();
        }
    }

    function onReceiveFail(message) {
        alert("load fail: " + message.adtype + "  " + message.adapter + " " + message.data);
    }

    function onDeviceReady() {
        keymob.initFromKeymobService('5010011945235570', false);
        document.addEventListener(keymob.AdEvent.ON_LOADED_SUCCESS, onAdReceive, false);
        document.addEventListener(keymob.AdEvent.ON_LOADED_FAIL, onReceiveFail, false);
    }

    $scope.showInterstitial = function(){
        onDeviceReady();
        keymob.loadInterstitial();
        // keymob.loadVideo();  
        // keymob.loadAppWall(); 
    };
    
    if (window.cordova){
        $scope.showInterstitial();
    }
});
