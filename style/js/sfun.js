$(function(){
/*
	$("#nav-f").click(function(){
		alertBlock("我们将选取与42、25有关的有意义的ID号赠送礼品，敬请期待");
	});	
*/	
	$("#nav-e").live("click",function(){
		$("#indexList").stop().fadeOut(200,function(){
			$("#clubList").fadeIn(500);
		});
		$(this).attr("id","nav-c");
	});
	
	$("#nav-c").live("click",function(){
		$("#clubList").stop().fadeOut(300,function(){
			$("#indexList").fadeIn(500);
		});
		$(this).attr("id","nav-e");
	});
	
	var $alertBlock = $("#alertBlock");
	
	var $ani = $("#main a");
	$ani.fadeTo(100,1).mouseover(function(){
		$aniImg = $(this).children("img").attr("src");
		
		$(this).stop().fadeTo(400,0.5).children("img").attr("src","style/img/s"+$(this).attr("href")+"h.png");
	}).mouseout(function(){
		$(this).stop().fadeTo(300,1).children("img").attr("src",$aniImg);
	});

	$("#indexList a").click(function(){
		$("#map").val($(this).attr("href"));
		
		$("#exit").click(function() {
			$("#roomBlock").fadeOut(200);
			return false;
		});
		
		$("#roomBlock").fadeIn(200);
		return false;
	});
	
	$("#roombg a").click(function() {
		$("#area").val($(this).attr("href"));
		
		$("#where").submit();
		return false;
	});
	
	$("#clubList a").click(function() {
		$("#map").val($(this).attr("href"));
		$("#area").val("1");
		
		$("#where").submit();
		return false;
	});
	$("#help").click(function() {
		alertBlock("<span style='text-align:center;'>点击一个你喜欢的星座进行许愿！</span>");
	});
	
	function alertBlock(s) {
		$alertBlock.fadeOut(200,function() {
			$("#alertText").html(s);
			$(this).fadeIn(200);
		});
	}
	
	function exitAlert() {
		$alertBlock.fadeOut(200);
	}
	
	$("#alertY").click(function() {
		exitAlert();
	});
	
	$("#alertN").click(function() {
		exitAlert();
	});	
	

});
	