adminModule.controller('distributionSysCtrl',function( $scope, $cookies, req, md5){
    var vm = this;
    function initSetting(){

    }
    function init(){
        initSetting();
        req_distributionList();
    }

    init();



    //添加系统配置请求
    function req_distributionList() {
        req.post('coffee-machine-admin/admin/app/list.json', {}).success(function (resp) {
            $scope.coffeeInfoList = resp;
           /* if (resp.code == '211') {
                $scope.coffeeInfoList = resp;
            }
            else {
                console.log(resp.msg);
            }*/
        });
    }


});