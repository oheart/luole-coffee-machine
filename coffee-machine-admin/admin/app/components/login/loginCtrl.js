adminModule.controller('loginCtrl', function ($scope, $cookies, req, md5, $state,loginData) {
    var vm = this;
    function initSetting(){
        vm.loginObj = {
            name: '',
            pwd:''
        }
    }
    function init(){
        initSetting();
    }
    init();
    vm.enterLogin = function(e){
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
            req_login();
        }
    }


    function req_login(){
        req.post('login',vm.loginObj).success(function(resp){
            if(resp && resp.code == '1'){
                var uName = resp.data.name;
                localStorage.setItem('userName', uName);
                $state.go('root');
            }else{
                layer.msg(resp.message);
            }
        });
    }

    // 登录
    vm.login = function(){
        //从service里获取登录数据
        req_login();
    }


});