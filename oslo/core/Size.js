Oslo["Size"] = {
	inDesktop: function() {
		if($(window).outerWidth() <= Oslo.Constant.DESKTOP_MINIMUM)
			return true;
		return false;
	},
	inTablet: function() {
		if($(window).outerWidth() <= Oslo.Constant.TABLET_MINUMUM)
			return true;
		return false;
	},
	inMobile: function() {
		if($(window).outerWidth() <= Oslo.Constant.MOBILE_MINIMUM)
			return true;
		return false;
	}
}