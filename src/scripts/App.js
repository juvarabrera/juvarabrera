/* OsloJS - v1.1.0 - 2017-03-07
 * https://github.com/juvarabrera/oslojs
 *
 * Copyright (c) 2017 Juvar Abrera;
 * Licensed under the MIT license 
*/
 jQuery(function($) {
	if (!Modernizr.touch) {
		debiki.Utterscroll.enable();
	}
});
 var App = {
 	Data: {},
	Classes: {},
	Controller: {},
	Constant: {},
	KeyboardListener: {},
	Route: {},
	Size: {},
	Utility: {},
	View: {},
	Function: {},
	"ready": function(page) {
		this.Route.call(page);
		$(window).scroll(function() {
			var pos = $(window).scrollTop();
			if(pos >= $(document).find("section.cover").outerHeight() - $(document).find(".action-bar").outerHeight())
				$(document).find(".action-bar").addClass("white");
			else 
				$(document).find(".action-bar").removeClass("white");
		})
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('./service-worker.js');
		}
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-72788966-1', 'auto');
		ga('send', 'pageview');
	},
	"isMobile": function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
}