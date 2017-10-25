adminModule.controller('distributionSysCtrl',function( $scope, $cookies, req, md5){
    var vm = this;
    function initSetting(){
            vm.search  = {
                key: ''
            }
            if(localStorage.getItem('selTabIndex')){
                vm.selTabIndex =  localStorage.getItem('selTabIndex');
            }else{
                vm.selTabIndex = '2';
            }
            vm.add = {
                userName: '',
                cellPhone:'',
                mail:'',
                shopName:'',
                address:'',
                telephone:''
            }
        vm.currentPage = 1;
        vm.askLogCurrentPage = 1;
        vm.sellLogCurrentPage = 1;
        vm.coffeeInfoList_total = 0;
        vm.askLog_total = 0;
        vm.sellLog_total = 0;
    }
    function init(){
        initSetting();
        req_findShop('1');
        req_findSAskLog('1');
        req_findSelLog('1');
    }

    init();

    var ifReqShopFlag = false;
    var ifReqAskLogFlag = false;
    var ifReqSelLogFlag = false;
    // 页数变化
    vm.pageChanged = function(newPageNumber,type){
        switch(type){
            case 'shop':
                if(!ifReqShopFlag){
                    req_findShop(newPageNumber);
                }
                break;
            case 'askLog':
                if(!ifReqAskLogFlag){
                    req_findSAskLog(newPageNumber);
                }
                break;
            case 'selLog':
                if(!ifReqSelLogFlag){
                    req_findSelLog(newPageNumber);
                }
                break;
        }

    }

    // 回车搜索
    vm.enterSearch = function(e){
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
            vm.search();
        }
    }
    // 搜索
    vm.search = function(){
        switch(vm.selTabIndex){
            case '1':
                req_findShop('1');
                break;
            case '2':
                req_findSAskLog('1');
                break;
            case '3':
                req_findSelLog('1');
                break;

        }
    }

    //店铺信息
    function req_findShop(newPageNumber) {
        ifReqShopFlag  = true;
        req.post('buzz/findShop', {
            key: vm.search.key,
            pageSize:10,
            currentPage:newPageNumber
        }).success(function (resp) {
            if (resp.code == '1') {
                vm.coffeeInfoList = resp.data.shops;
                vm.coffeeInfoList_total = resp.data.count;
                vm.currentPage = newPageNumber;
                ifReqShopFlag  = false;
            }
            else {
                console.log(resp.msg);
                ifReqShopFlag  = true;
            }
        });
    }

    //咖啡机申请记录
    function req_findSAskLog(newPageNumber) {
        ifReqAskLogFlag = true;
        req.post('buzz/findAskLog', {
            key: vm.search.key,
            pageSize: 10,
            currentPage:newPageNumber
        }).success(function (resp) {
            if (resp.code == '1') {
                vm.askLog = resp.data.shops;
                vm.askLog_total = resp.data.count;
                vm.askLogCurrentPage = newPageNumber;
                ifReqAskLogFlag = false;
            }
            else {
                console.log(resp.msg);
                ifReqAskLogFlag = true;
            }
        });
    }

    //二维码分销记录
    function req_findSelLog(newPageNumber){
        ifReqSelLogFlag = true;
        req.post('buzz/findSellLog', {
            key: vm.search.key,
            pageSize: 10,
            currentPage:newPageNumber
        }).success(function (resp) {
            if (resp.code == '1') {
                vm.sellLog = resp.data.shops;
                vm.sellLog_total = resp.data.count;
                vm.sellLogCurrentPage = newPageNumber;
                ifReqSelLogFlag = false;
            }
            else {
                console.log(resp.msg);
                ifReqSelLogFlag = true;
            }
        });
    }

    vm.resetFormInfo = function(e){
        if($(e.target).next().hasClass('error-msg-wrapper')){
            $(e.target).next().remove();
        }
    }
    vm.validFormInfo = function(e,hint){
        console.log(e.target.value);
        if(e.target.value == ''){
             console.log(e);
             var errorMsg = hint + '不可为空';
             $(e.target).parent().append('<div class="error-msg-wrapper clear">\n' +
                 '                                        <span class="red-hint">' + errorMsg + '</span>\n' +
                 '                                </div>');
        }
    }
    // 添加店铺
    vm.addStore = function(){
        $('#add-store-modal').modal('show');
        vm.add.userName = '';
        vm.add.cellPhone = '';
        vm.add.mail = '';
        vm.add.shopName = '';
        vm.add.address = '';
        vm.add.telephone = '';
    }

    // 确认添加店铺
    vm.confirmAdd = function(){
        req_confirmAdd();
    }
    // 确认添加店铺请求
    function req_confirmAdd(){
        if(vm.add.userName == '' || vm.add.cellPhone == '' || vm.add.mail == '' || vm.add.shopName == '' || vm.add.address == '' || vm.add.telephone == ''){
            layer.msg('请填写相关信息')
            return;
        }
        req.post('buzz/createShop', {
            userName: vm.add.userName,
            cellPhone: vm.add.cellPhone,
            mail: vm.add.mail,
            shopName: vm.add.shopName,
            address: vm.add.address,
            telephone: vm.add.telephone
        }).success(function (resp) {
            if (resp.code == '1') {
                console.log(resp.msg);
                $('#add-store-modal').modal('hide');
                req_findShop('1');
            }
            else {
                console.log(resp.msg);
            }
        });
    }

    // 取消添加店铺
    vm.cancel  = function(){
        $('#add-store-modal').modal('hide');
    }
    // 生成二维码
    vm.createQR = function(item){
            req_createQR(item);
    }
    // 生成二维码请求
    function req_createQR(item){
        req.post('buzz/createQR', {
            shopId:  item.shopId,
            pshopId: item.pshopId,
            shopName: item.shopName
        }).success(function (resp) {
            //loading层
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            if(resp && resp.code == 1){
                //关闭
                layer.close(index);
                req_findSAskLog('1');
                layer.msg('生成成功');
                vm.selTabIndex = 1;
            }else{
                layer.msg(resp.message);
            }
        });
    }

    // 切换选项卡
    vm.toggleTab = function(selTabIndex){
        vm.search.key = '';
        vm.selTabIndex = selTabIndex;
        localStorage.setItem('selTabIndex',vm.selTabIndex);
        switch(selTabIndex){
            case '1':
                req_findShop('1');
                break;
            case '2':
                req_findSAskLog('1');
                break;
            case '3':
                req_findSelLog('1');
                break;
        }
    }

});