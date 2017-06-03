angular.module('app.directives', [])

/**
* 二维码信息生成器
*/
.directive("wminfo", function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            infostr: '@',
            size: '@',
            forecolor: '@',
            backcolor: '@'
        },
        template: "<div id='qrcanvas'></div>",
        link: function (scope, element, attrs) {
            (function ($) {
                var q = $('#qrcanvas');
                var draw = function () {
                    var colorIn = '#191970';
                    var colorOut = '#cd5c5c';
                    var forecolor = scope.forecolor;
                    var backcolor = scope.backcolor;
                    var options = {
                        cellSize: Number(scope.size),
                        foreground: [
                            // 背景颜色
                            {style: forecolor},
                            // outer squares of the positioner
                            {row: 0, rows: 7, col: 0, cols: 7, style: colorOut},
                            {row: -7, rows: 7, col: 0, cols: 7, style: colorOut},
                            {row: 0, rows: 7, col: -7, cols: 7, style: colorOut},
                            // inner squares of the positioner
                            {row: 2, rows: 3, col: 2, cols: 3, style: colorIn},
                            {row: -5, rows: 3, col: 2, cols: 3, style: colorIn},
                            {row: 2, rows: 3, col: -5, cols: 3, style: colorIn},
                        ],
                        background: backcolor,
                        data: scope.infostr,
                        typeNumber: 1,
                    };
                    // q.innerHTML = '';
                    var img = new Image(); 
                    img.src = 'img/iloveme.jpg'; 
                    options.logo = {
                      clearEdges: 50,
                      size: 10 / 100,
                      margin: 10,
                    };
                    options.logo.image = img;
                    q.appendChild(qrgen.canvas(options));
                };
                draw();//自动调用画图方法
            })(document.querySelector.bind(document));
        }
    };
    });
