/**
 * Created by Admin on 2016/6/28.
 */
angular.module('admin.services', [])
    .constant('baseUrl', '/ideal/')
    // .constant('baseUrl', 'http://192.168.3.106:8081/')
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
          req.post('login',params).success(function(resp){
              if(resp && resp.code == '1'){
                  if (callback) callback(resp);
                  console.log(resp)
              }
            });
        }
        return {
            req_login: req_login
        }
    })



    

