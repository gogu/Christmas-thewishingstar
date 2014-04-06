$(function(){
	var $starArea = $("#starArea");
	var $alArea = $("#alArea");
	var $allstar = $(".starStyle");
	var $mainstar = $("#mainStar li");
	var $nullstar = $('<li class="starStyle"><p class="pra">未点亮</p><p class="nickname">unknow</p></li>');
	var $con = $("#con img");
	var $target = $(".starTarget");
	var $wishText = $("#wishText");
	var $alertBlock = $("#alertBlock");
	var $upBlock = $("#upBlock");
	var $roomBlock = $("#roomBlock");
	
	var starObj = function(starId,pra,nickname,locx,locy,status){
		this.starId = starId;
		this.pra = pra;
		this.nickname = nickname;
		this.locx = locx;
		this.locy = locy;
		this.status = status;
	}
	
	function watchStar() {
		$allstar.live("click",function(){
			var star = getStar($(this));
			
			$target.fadeOut(100,function() {
				$con.fadeTo(300,0.2);
				$target
					.css("left",parseInt(star.locx)-19+"px")
					.css("top",parseInt(star.locy)-19+"px")
					.fadeIn(400);
				$wishText.empty().fadeOut(200,function(){
					$(this).append('<p class="starId">'+star.starId+'<p class="praStyle">'+star.pra+'</p><p class="nicknameStyle">'+star.nickname+'</p>')
					.fadeIn(300);
				});
			});		
		});
		
		$mainstar.click(function() {
			var mainblock = $(this).html();
			roomBlock(mainblock);
		});
	}
	
	var power = false;
	watchStar();
	
	//function
	function getStar(oli) {
		var star = new starObj(
			oli.children(".starId").text(),
			oli.children(".pra").text(),
			oli.children(".nickname").text(),
			oli.css("left"),
			oli.css("top"),
			oli.hasClass("waiting")
		);
		return star;
	} //获取一个星对象
	
	function preCreate(x,y) {
	
		if ($alArea.text() === "false") {
			alertBlock("此区域星星已满上限，<br />请移步<a href='.'>星座主页</a>选择其他区域");
			$("#alertY").click(function(){
				window.location.href = ".";
			});

			power = false;
		} else { 
			power = true; 
			alertBlock("选择一个坐标放置你的许愿星");
			$("#alertN").click(function(){
				power = false;
			});
		}
		if (power===true) {
			$alArea.addClass("pointer").click(function(e) {
				var e = e || window.event;
				
				var x = e.offsetX - 11 || e.layerX - 11;
				var y = e.offsetY - 11 || e.layerY - 11;
				
				creatStar(x,y);
				console.log(x);
				console.log(y);
			});
		}
		//function
	}
	
		$("#wishStart").click(function(){
			if (power===false) preCreate();
		});
	
	function creatStar(x,y,star) {
		var star = $nullstar.clone();
		$target.after(star);
		star.css("left",x+"px").css("top",y+"px");
		
		alertBlock("你的愿望将永恒位于此坐标，确定要在此处许愿吗？");
		
		$("#alertY").click(function(){upBlock(x,y)});
		$("#alertN").click(function(){star.detach();});
		$("#upN").click(function() {
			star.detach();
			$upBlock.fadeOut(500);
		});
	}
	
	function upBlock(x,y) {
		$upBlock.fadeIn(400);
		$("#locx").val(x);
		$("#locy").val(y);
	}
	
	function roomBlock(s) {
		$("#blankbg").html(s);
		$roomBlock.slideDown(600);
		$("#exit").click(function(){
			$roomBlock.slideUp(600);
		});
	}
	
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

	$("#help").click(function() {
		alertBlock("<span style='font-size:14px;'>如何许愿？<br />步骤一：点击“我要许愿”<br />步骤二：将许愿星放入您喜欢的位置<br />步骤三：进行许愿<br />步骤四：等待您的许愿星点亮</span>");
	});
	

	//valiad
	$("form").submit(function(){
		var nickname = $("#upNickname"),email = $("#upEmail"),mes = $("#upContent");
		
		if (nickname.val() === "") {
			alertBlock("请输入您的昵称= =");
			$("#alertY").click(function(){
				nickname.focus();
			});
			return false;
		}
		if (email.val() === "") {
			alertBlock("请输入您的学校邮箱= =");
			$("#alertY").click(function(){
				email.focus();
			});
			return false;
		}
		if (mes.val() === "") {
			alertBlock("请输入您的许愿内容= =");
			$("#alertY").click(function(){
				mes.focus();
			});
			return false;
		} else if(mes.val().length > 50) {
			alertBlock("字数超了= =");
			$("#alertY").click(function(){
				mes.focus();
			});
			return false;
		}
	});
	
	var $upContent = $("#upContent"),$count = $("#wordCount").text(50 - $upContent.val().length);
	
	$upContent.keyup(function(){
		var uplength = $(this).val().length;
		if (uplength<=50) {
			$count.text(50 - uplength);
		} else {
			$(this).val(
				$upContent.val().substr(0,50)
			);
		}
	}); 

	//style
	$(".waiting").fadeTo(0,0.5);
	
	var px = $("#posx"),py = $("#posy");
	$starArea.mousemove(function(e){
		var x = e.clientX;
		var y = e.clientY;
		
		px.text(x);
		py.text(y);
	});
	
	if (!($.browser.msie&&($.browser.version == "7.0"))){
		$allstar.not(".waiting").mouseover(function(){
			$(this).stop().fadeTo(500,0.6);
		}).mouseout(function(){
			$(this).stop().fadeTo(400,1);
		});
	}
	
/*
	$("#nav-f").click(function(){
		alertBlock("我们将选取与42、25有关的有意义的ID号赠送礼品，敬请期待");
	});
*/
});