$(function(){
 		// tab切换
 	    $(".nav li a").click(function(){
 	        $("li a").removeClass("sel");
 	        $(this).addClass("sel");
 	        var _index = $(this).parent().index();
 	        $(".luole-coffee-content").hide().eq(_index).show();
 	    });



        $("input").each(function(){
            // 为表单必填项动态添加*
        	if($(this)[0].required){
				if($(this).prev().hasClass("apply-tit-field")){
                    $(this).prev().append('<span class="red-hint">*</span>');
                    $(this).parent().append('<div class="errror-msg-wrapper"></div>');
				}
			}
			// 验证正则
			function validIsTrue(type,str){
        		var reg;
        		switch(type){
					case 'phone':
                        reg = /^\d{3}-\d{7,8}$|^\d{4}-\d{7,8}$|^\d{3}-\d{3}-\d{4}$|^1[3|4|5|7|8]\d{9}$/;
                        break;
					case 'email':
                        reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
                        break;
				}
				if(reg.test(str)){
        			return true;
				}
				return false;
			}
			// 表单获取焦点时清空校验错误信息
			$(this).focus(function(){
                if($(this).next().hasClass('errror-msg-wrapper')){
                    $(this).next().empty();
                }
			})

			// 表单失去焦点之后校验输入格式
			$(this).blur(function(){
				console.log($(this).val());
				//校验姓名、店铺名称、店铺地址是否为空（必填）
				 if($(this).is("#apply-name") && $(this).val() == ''){
                     var errorMsg = '姓名不可为空';
                     var html = '<div class="error-msg-box mt5">' +
                         '<span class="red-hint">' + errorMsg + '</span>' +
                         '</div>';
                     if($(this).next().hasClass('errror-msg-wrapper')){
                         $(this).next().append(html);
                     }
				 }else if($(this).is("#apply-store-name") && $(this).val() == ''){
                     var errorMsg = '店铺名称不可为空';
                     var html = '<div class="error-msg-box mt5">' +
                         '<span class="red-hint">' + errorMsg + '</span>' +
                         '</div>';
                     if($(this).next().hasClass('errror-msg-wrapper')){
                         $(this).next().append(html);
                     }
				 }else if($(this).is("#apply-store-address") && $(this).val() == ''){
                     var errorMsg = '店铺地址不可为空';
                     var html = '<div class="error-msg-box mt5">' +
                         '<span class="red-hint">' + errorMsg + '</span>' +
                         '</div>';
                     if($(this).next().hasClass('errror-msg-wrapper')){
                         $(this).next().append(html);
                     }
				 }

				//校验个人信息联系电话(必填)
				if($(this).is("#apply-link-phone")){
					if(this.value == ''){
						var errorMsg = '联系电话不可为空';
                        var html = '<div class="error-msg-box mt5">' +
                            '<span class="red-hint">' + errorMsg + '</span>' +
                            '</div>';
                        if($(this).next().hasClass('errror-msg-wrapper')){
                            $(this).next().append(html);
                        }
					}else if(this.value != '' && !validIsTrue('phone',this.value)){
                        var errorMsg = '联系电话格式不正确';
                        var html = '<div class="error-msg-box mt5">' +
                            '<span class="red-hint">' + errorMsg + '</span>' +
                            '</div>';
                        if($(this).next().hasClass('errror-msg-wrapper')){
                            $(this).next().append(html);
						}
					}
				}

				// 校验店铺联系电话(选填)
				if($(this).val() != '' && $(this).is("#apply-store-link-phone")){
                    $(this).parent().append('<div class="errror-msg-wrapper"></div>');
                    if(!validIsTrue('phone',this.value)){
                        var errorMsg = '联系电话格式不正确';
                        var html = '<div class="error-msg-box mt5">' +
                            '<span class="red-hint">' + errorMsg + '</span>' +
                            '</div>';
                        if($(this).next().hasClass('errror-msg-wrapper')){
                            $(this).next().append(html);
                        }
					}
				}
                //校验电子邮箱(选填)
                if($(this).is("#apply-email") && this.value != ''){
                    $(this).parent().append('<div class="errror-msg-wrapper"></div>');
                   if(!validIsTrue('email',this.value)){
                        var errorMsg = '电子邮箱格式不正确';
                        var html = '<div class="error-msg-box mt5">' +
                            '<span class="red-hint">' + errorMsg + '</span>' +
                            '</div>';
                        if($(this).next().hasClass('errror-msg-wrapper')){
                            $(this).next().append(html);
                        }
                    }
                }
			})
		})


        $('.apply-machine-from').ajaxForm(function(resp) {
            console.log(resp)
            if(resp.code == '1'){
                layer.msg('提交成功');
                $('.apply-machine-from')[0].reset();
            }else{
                layer.alert(resp.message);
            }
        });


		// 获取地址栏参数
        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var url = window.location;
            var r = url.search.substr(1).match(reg);
            if(r!=null)return  decodeURIComponent(r[2]); return null;
        }


        console.log(GetQueryString('pshopId'));
        console.log(GetQueryString('pshopName'));
		var pshopIdVal = GetQueryString('pshopId');
		var pshopNameVal = GetQueryString('pshopName');
		console.log(pshopIdVal);
		console.log(pshopNameVal)
		$('#pshopId').val(pshopIdVal);
        $('#pshopName').val(pshopNameVal);
    });