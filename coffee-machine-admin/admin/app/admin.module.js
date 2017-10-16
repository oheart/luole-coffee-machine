var adminModule = angular.module('admin.module',['ui.router','ngCookies','angular-md5','admin.services','admin.filter','admin.directive','admin.value','ngFileUpload','angularUtils.directives.dirPagination']);
adminModule.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
       //header
        .state('header', {
            url:'/header',
            views:{
                'header':{
                    templateUrl: 'admin/app/shared/header/header.html',
                    controller: 'headCtrl as header'
                }
            }

        })
        //distribution_sys
        .state('sys', {
            url:'/sys',
            views:{
                'main':{
                    templateUrl: 'admin/app/components/distribution_sys/distribution_sys.html',
                    controller: 'distributionSysCtrl as distributionSys'
                }
            }

        })
        //login
        .state('login', {
            url:'/login',
            views:{
                'login':{
                    templateUrl: 'admin/app/components/login/login.html',
                    controller: 'loginCtrl as login'
                }
            }

        })
        //总容器(包含header和main部分)
        .state('root', {
            url:'/',
            views:{
                'header':{
                    templateUrl: 'admin/app/shared/header/header.html',
                    controller: 'headCtrl as header'
                },
                'main':{
                    templateUrl: 'admin/app/components/distribution_sys/distribution_sys.html',
                    controller: 'distributionSysCtrl as distributionSys'
                }
            }
        })



});
adminModule.run(function($rootScope, req, $window, $state, $cookies){

    $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
        console.log('Enter state: ' + toState.name);
    })
});
adminModule.factory('HttpInterceptor', ['$q', '$cookies', '$rootScope','$location', function ($q, $cookies, $rootScope, $location, $window) {
    //重新登录前清除所有的cookie
    function removeAllCookies(){
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });
    }
    //未登录弹框提示并跳转到登录页面
    function handleLogOut() {
        $rootScope.user_online = false;
        removeAllCookies();
        $cookies.put('latest_hash', location.hash);
        //$state.go('root.login');
        // location.href = '/admin.html#/login';
        location.href = '/manager/login';
      /*  layer.alert('请登录', function (index) {
            $cookies.put('latest_hash', location.hash);
            layer.close(index);
            location.href = '/admin.html#/login';
            //location.reload();
        });*/
    }


    return {
        request:       function (config) {
            return config;
        },
        requestError:  function (err) {
            return $q.reject(err);
        },
        response:      function (res) {
            //遇到掉线但接口可以返回响应的情况：判断msg内容
            if (res.status == 200) {
                if (res.data.msg == '未登录') {
                    handleLogOut();
                }
            }
            return res;
        },
        responseError: function (err) {
            console.warn(err);
            if (-1 === err.status) {
                // 远程服务器无响应
            } else if (500 === err.status) {
                // 处理各类自定义错误
                // location.href = '/manager/error';
                
            } else if (501 === err.status) {
                // ...
            } else if (404 === err.status) {
                //handleLogOut();
                // location.href = '/manager/error';
            }
            return $q.reject(err);
        }
    };
}]);
//添加拦截器
adminModule.config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.defaults.withCredentials = true;
}]);

