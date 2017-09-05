var p = {}
p.init = function() {
	p.initVar()
	p.initEvent()
}
p.initVar = function() {
	$j_shops = $out_wrap.find('.j_shops')
}
p.initCss = function() {
	$out_wrap.css("visibility","visible")
}
p.initEvent = function() {
	$j_shops.delegate('li', 'click', function(e) {
		e.preventDefault()
		e.stopPropagation()
		window.location.href = $(this).attr('data-url')
	})
}