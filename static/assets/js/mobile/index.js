var p = {
	'classname':'Shops'
};
p.init = function() {
	p.initVar();
	p.initEvent();
	p.loadDatas();
};
p.initVar = function() {
	$j_banners = $out_wrap.find('.j_banners');
	$j_shops = $out_wrap.find('.j_shops');
	$j_loadmore = $out_wrap.find('.j_loadmore');
	banners = [
		// {
		//  	'img': 'redAD',
		//  	'link': 'javascript:;'
		// }
		{
		 	'img': 'bannerAD2',
		 	'link': '../banner/?vId='+(+new Date())
		}
		,{
			'img': 'bannerAD3_1',
			'link': 'https://v.qq.com/x/page/e0557cxmkm1.html'
	   	}		
	];
	page = 0;
	size = 100;
	category=["食趣","宿趣","萌趣","闲趣","节趣"]
	cateIdx=0
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent = function() {
	$j_shops.delegate('li', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.href = ['../shop/?id=',$(this).attr('data-id')].join('');
	});
	$(".icon-list").delegate('li', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var idx=$(this).index();
		if(idx!=cateIdx){
			cateIdx=idx
			p.loadShops();
		}
	});
};
p.loadDatas = function() {
	// menuHtml('shop','mee1');
	p.loadBanners();
	p.loadShops();
};
p.loadBanners = function() {
	var arr = [];
	for (var i = banners.length-1 ; i >= 0 ; i--) {
		arr.push(['<li><a class="pic" href="',banners[i].link,'"><img class="j_picture" data-src="',defaultImg,'" src="',imgpath,'banner/',banners[i].img,'.jpg" alt=""></a></li>'].join(''));
	};
	$j_banners.html(arr.join(''));
	if(banners.length>1){
		// 左右滑动轮播
		TouchSlide({ 
			slideCell: "#slideBox",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			autoPage:true, //自动分页
			autoPlay:true, //自动播放
			delayTime: 500,
			interTime: 6000,
		});
	}
	else{
		$('.hd').hide();
	}
};
p.loadShops = function() {
	loading()
	var query = new AV.Query(p['classname']);
    // query.ascending("sort");
    query.descending("shopId");
	query.equalTo('category',category[cateIdx]);
	query.notEqualTo('status',"0");
	// query.notEqualTo('sort',0);
    query.limit(size);
    // query.skip(page*size);
	query.find({
		success: function(datas) {
			var l=datas.length;
			loadingHide();
			if(l>0){
				var arrHtml = [];
				for (var i=0; i<l; i++) {
					arrHtml.push(shopHtml(datas[i],i+1,l));
				};
				$j_shops.html(arrHtml.join(''));
				// page++;
				if(l<size){
		  			$j_loadmore.off().empty();
		  			// $j_loadmore.off().html('已加载完所有数据');
		  			// setTimeout(function(){
		  			// 	$j_loadmore.hide();
		  			// },1500);
				}
		  	}
		  	else{
		  		// $j_loadmore.off().html('已加载完所有商户');
		  		$j_loadmore.off().html('该版块还没有商户哦！');
		  		$j_shops.empty();
		  	}
			echo.init({
			    offset: 300, 
			    throttle: 0 
			});
	   	},
	    error: function(user, error) {
	    	$j_loadmore.off().html('服务器不给力哦');
	    }
	}); 
};
function shopHtml(shop){
	return [
		'<li class="thinner-border" data-id="',shop.get("shopId"),'" >',
			'<div class="userarea j_view">',
				'<div class="logo-img" style="background-image: url(',defaultImg,');" data-echo-background="',shop.get("logo"),'"></div>',
				'<div class="userinfo">',
					'<div class="objname">',shop.get("name"),'</div>',
					'<div class="follow j_follow">优惠信息</div>',
				'</div>',
			'</div>',
		'</li>'
	].join('');
}
// //获取滚动条当前的位置 
// function getScrollTop() { 
// 	var scrollTop = 0; 
//     if (document.documentElement && document.documentElement.scrollTop) { 
//     	scrollTop = document.documentElement.scrollTop; 
//     } 
//     else if (document.body) { 
//     	scrollTop = document.body.scrollTop; 
//     } 
//     return scrollTop; 
// } 

// //获取当前可是范围的高度 
// function getClientHeight() { 
// 	var clientHeight = 0; 
//     if (document.body.clientHeight && document.documentElement.clientHeight) { 
//    		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
//     } 
//     else { 
//     	clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
//     } 
//     return clientHeight; 
// }

// //获取文档完整的高度 
// function getScrollHeight() { 
// 	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
// } 
// window.onscroll = function () { 
// 	if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
// 		p.loadShops();
// 	} 
// }; 