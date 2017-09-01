var p = {
	'classname':'Shops'
};
p.init = function() {
	p.initVar();
	p.initEvent();
	menuHtml('shop','mee1');
	p.initData();
};
p.doNoShop=function(){
	loadingHide();
	Dialog.ShowDialog({
        title: '',
        otherBtns: [],
        cancelBtn: '我知道了',
        content: '该商户不存在哦！'
	});
	return
}
p.initVar = function() {
	shop = {};
	shopId = misc.getParam('id') || '';
	if(!shopId) p.doNoShop()
	shop.pid = misc.getParam('pid') || '';
	$body = $('body');
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent = function() {
	
};
p.initData = function(){
	p.initCss();
	p.loadShop();
};
p.loadShop = function() {
	var query = new AV.Query(p['classname']);
	if(shop.pid){
		query.equalTo("pid",shop.pid);
	}
	if(shopId){
		query.equalTo("shopId",shopId);
	}
	query.find({
		success: function(datas) {
			shop = datas[0];
			if(shop && shop.id){
				loadingHide();
				// $out_wrap.find('.j_shop_img').attr('data-echo-background','../../static/assets/images/mobile/shop1.jpg');
				$out_wrap.find('.j_shop_img').attr('data-echo-background',shop.attributes['img0']||shop.get('logo'));
				document.title=shop.get('name')
				$out_wrap.find('.shop-name').html(shop.get('name'));
				$('.discount').html(shop.get('discount'))
				$('#addr').html('<div class="value">'+shop.get('addr')+'</div>')
				if(shop.get('tel'))
					$('#telmobile').append('<div class="value">'+shop.get('tel')+'</div>')
				if(shop.get('mobile'))
					$('#telmobile').append('<div class="value">'+shop.get('mobile')+'</div>')
				
				$('.iconfont').css('color', shop.get('themeColor'))
				$('.shop-name').css('color', shop.get('themeColor'))
				$('.triangle-up').css('border-bottom-color', shop.get('themeColor'))
				$('.discount').css('outline-color', shop.get('themeColor'))
				$('.line-th em').css('background-color', shop.get('themeColor'))
				echo.init({
				    offset: 300, 
				    throttle: 0 
				});
		  	}
		  	else p.doNoShop
	   	},
	    error: function(data) {
	    	p.doNoShop
	    }
	}); 
};