angular.module("admin.directive", [])
    // 放大二维码图片
    .directive('enlargePic',function(){
        return{
            restrict: "AE",
            link: function(scope,elem){
                elem.bind('mouseover',function($event){
                    var img = $event.srcElement || $event.target;
                    var resultLeft = img.parentNode.offsetLeft + img.parentNode.offsetWidth/2;
                    var resultTop = img.parentNode.offsetTop + img.parentNode.offsetHeight/2;
                    console.log(resultLeft)
                    $(img).next().hide();
                    if($(img).next().hasClass('coffee-hover-large-img')){
                        $(img).next().show();
                        $($(img).next())[0].style.left = resultLeft + 'px';
                        $($(img).next())[0].style.top = resultTop + 'px';
                    }
                })
                elem.bind('mouseleave',function($event){
                    var img = $event.srcElement || $event.target;
                    $(img).next().hide();
                })
            }
        }
    })
    // 关闭放大的二维码图片
    .directive('closeLargePic',function(){
        return{
            restrict: "AE",
            link: function(scope,elem){
                elem.bind('mouseover',function($event){
                    var largePic = $event.srcElement || $event.target;
                    $(largePic).show();
                })
                elem.bind('mouseleave',function($event){
                    var largePic = $event.srcElement || $event.target;
                    $(largePic).hide();
                })
                elem.bind('click',function($event){
                    var largePic = $event.srcElement || $event.target;
                    $(largePic).hide();
                })
            }
        }
    })








