adminModule.controller('headCtrl',function( $scope, $cookies, req, $state ){
    var vm = this;
    vm.userName = localStorage.getItem('userName');


    // 退出
	 vm.logout = function(){
         req.post('logout').success(function(resp){
             console.log(resp);
             if(resp.code == '1'){
                 $state.go('login');
             }else{
                 console.log(resp);
             }
         });
     }
});