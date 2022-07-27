/* OsloJS - v1.1.0 - 2017-03-07
 * https://github.com/juvarabrera/oslojs
 *
 * Copyright (c) 2017 Juvar Abrera;
 * Licensed under the MIT license 
*/
var Oslo = {
 	Data: {},
	Classes: {},
	Controller: {},
	Constant: {},
	Route: {},
	Size: {},
	Utility: {},
	View: {},
	Function: {},
	"ready": function(page) {
		this.Route.call(page);
	},
	"location": function(controller, action, ca) {
		console.log(controller, action, ca)
	},
	"isMobile": function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
}