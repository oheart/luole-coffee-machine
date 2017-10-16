/**
 * Created by Admin on 2016/6/28.
 */
angular.module('admin.services', [])
    .constant('baseUrl', '/luole-coffee-machine/')
    .factory('req', function ($http, baseUrl) {
        var transform = function (data) {
            return $.param(data);
        };
        var postConfig = {
            headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        };

        //GET 请求
        function get(url, data) {
            return $http.get(baseUrl + url, {
                params: data
            });
        }

        //POST 请求
        function post(url, data) {
            var data = data || {}
            return $http.post(
                baseUrl + url,
                data,
                postConfig
            );
        }

        return {
            get:      get,
            post:     post
        }
    })
    .factory('loginData',function(req){
        function req_login(params,callback){
          req.post('coffee-machine-admin/admin/app/list.json',params).success(function(resp){
               if (callback) callback(resp);
            });
        }
        return {
            req_login: req_login
        }
    })



    

