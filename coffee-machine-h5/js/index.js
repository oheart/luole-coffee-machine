    // 初始化字体
	function initFontSize(){
		document.body.style.height=view().h+"px";
		document.body.style.height=view().w+"px";
		function view(){
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		};
		}
		var fontSize = document.documentElement.clientWidth / 20;
		fontSize = fontSize > 18 ? 18 : fontSize;
		document.documentElement.style.fontSize = fontSize + 'px';
	}
// 	initFontSize();

 	$(function(){
 	    $(".nav li a").click(function(){
 	        $("li a").removeClass("sel");
 	        $(this).addClass("sel");
 	        var _index = $(this).parent().index();
 	        $(".luole-coffee-content").hide().eq(_index).show();
 	    });
 	});