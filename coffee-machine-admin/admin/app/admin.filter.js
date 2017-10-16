angular.module('admin.filter', [])
    //广告位对应位置-广告位管理
    .filter('adPositionFilter', function () {
        return function (input) {
            var result = "";
            if (input) {
                result = "第" + input + "广告位";
            }
            return result;
        }
    })



