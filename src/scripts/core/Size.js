App["Size"] = {
	inDesktop: function() {
		if($(window).outerWidth() <= App.Constant.DESKTOP_MINIMUM)
			return true;
		return false;
	},
	inTablet: function() {
		if($(window).outerWidth() <= App.Constant.TABLET_MINUMUM)
			return true;
		return false;
	},
	inMobile: function() {
		if($(window).outerWidth() <= App.Constant.MOBILE_MINIMUM)
			return true;
		return false;
	}
}