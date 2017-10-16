angular.module("admin.directive", [])
    // 分销系统列表
    .directive('tabList',function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/luole-coffee-machine/coffee-machine-admin/admin/app/templates/tab_list.html'
        }
    })
	// 分销系统搜索部分
    .directive('searchListPart',function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/luole-coffee-machine/coffee-machine-admin/admin/app/templates/search_list.html'
        }
    })
	// 分销系统列表
	.directive('sysTableList',function(){
		return {
			restrict: 'E',
            replace: true,
			templateUrl: '/luole-coffee-machine/coffee-machine-admin/admin/app/templates/table_list.html'
		}
	})

