angular.module('app', [
    'ionic',
    'ngCordova',
    'cordovaToast',
    'ionic-modal-select',
    'pascalprecht.translate',

    // modules
    // 'for100.ctrl.answer',  -- not functioning right now
    'app.services',
    'app.directives',
    'app.ctrl.answer',
    'app.ctrl.choose',
    'app.ctrl.mymodel',
    'app.ctrl.qrcode',
    'app.ctrl.qrcode_gh',
    'app.ctrl.score',
    'app.ctrl.settings',
    'app.ctrl.index'
    // 'templates'
    ])

    .run(function ($ionicPlatform, $cordovaStatusbar, $location, $state, $ionicHistory, $ionicPopup, $cordovaToast) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
                $cordovaStatusbar.overlaysWebView(true);
                $cordovaStatusbar.styleHex('#387ef5');
            }

            // keymob.initFromKeymobService('7030816955638476', false);
            // keymob.initFromKeymobService('2010010905933477', false);
            // keymob.initFromKeymobService('3060617955935458', false);
            // keymob.initFromKeymobService('5010011945235570', false);
            // keymob.initFromKeymobService('9050817935130522', false);

            //双击退出
            $ionicPlatform.registerBackButtonAction(function (e) {
                
                var langkey = window.localStorage.langkey.replace(/^\"|\"$/g,'');
                // var langkey = 'zh';

                function showConfirm() {
                    var confirmPopup;
                    if(langkey=='en'){
                        confirmPopup = $ionicPopup.confirm({
                        title: '<strong>tips</strong>',
                        template: 'Are you sure to leave me alone?',
                        okText: 'sorry',
                        cancelText: 'fight again'
                        });
                    }
                    else{
                        confirmPopup = $ionicPopup.confirm({
                        title: '<strong>提示</strong>',
                        template: '主人，你真的要离开我吗?',
                        okText: '狠心离开',
                        cancelText: '再战一回'
                        });
                    }

                    confirmPopup.then(function (res) {
                        if (res) {
                            ionic.Platform.exitApp();
                        } else {
                            // Don't close
                        }
                    });
                }
                //判断处于哪个页面时双击退出
                if ($location.path() == '/index') {
                    showConfirm();
                } else if ($location.path() == '/answer') {
                    // $ionicHistory.goBack();
                } else if ($location.path() == '/score') {
                    $state.go('index');
                } else if ($ionicHistory.backView() ) {
                    $ionicHistory.goBack();
                } else {
                    // This is the last page: Show confirmation popup
                    showConfirm();
                }
                e.preventDefault();
                return false;
            }, 101);
        });
    })

    .config(function($translateProvider){
        $translateProvider.translations('en', translationEN);
        $translateProvider.translations('zh', translationZH);
        $translateProvider.registerAvailableLanguageKeys(['en','zh'],{
            'en-*': 'en',
            'zh-*': 'zh'
        });
        $translateProvider.determinePreferredLanguage();
        window.localStorage.langkey='zh';
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('index', {
                url: "/index",
                templateUrl: "templates/for100.html",
                controller: "for100Ctrl",
                cache:'false'
            })

            .state('answer', {
                url: "/answer",
                templateUrl: "templates/answer/answer.html",
                controller: "answerCtrl",
                cache:'false'
            })

            .state('choose', {
                url: '/choose',
                templateUrl: 'templates/choose/choose.html',
                controller: "chooseCtrl",
                cache:'false'
            })

            .state('mymodel', {
                url: '/mymodel',
                templateUrl: 'templates/mymodel/mymodel.html',
                controller: "mymodelCtrl",
                cache:'false'
            })


            .state('qrcode', {
                url: '/qrcode',
                templateUrl: 'templates/qrcode/qrcode.html',
                controller: "qrcodeCtrl",
                cache:'false'
            })

            .state('qrcode_gh', {
                url: '/qrcode_gh',
                templateUrl: 'templates/qrcode_gh/qrcode_gh.html',
                controller: "qrcode_ghCtrl",
                cache:'false'
            })

            .state('score', {
                url: '/score',
                templateUrl: 'templates/score/score.html',
                controller: "scoreCtrl",
                cache:'false'
            })

            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings/settings.html',
                controller: "settingsCtrl",
                cache:'false'
            });

        $urlRouterProvider.otherwise('/index');
    });
