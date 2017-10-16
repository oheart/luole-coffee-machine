adminModule.controller('loginCtrl', function ($scope, $cookies, req, md5, $state,loginData) {
    var vm = this;
    function initSetting(){
        vm.loginObj = {
            accountNumer: '',
            password:''
        }
    }
    function init(){
        initSetting();
    }
    init();
    // 登录
    vm.login = function(){
        //从service里获取登录数据
        loginData.req_login(vm.loginObj,function(data){
            console.log(data);
        })
    }


});