App["Route"] = {
	"call": function(dir) {
		var directory = App.Utility.getCAP(dir);
		App.CONTROLLER = directory[0].charAt(0).toUpperCase() + directory[0].slice(1) + "Controller";
		App.ACTION = directory[1];
		var parameters = directory[2];
		App.Controller.construct(parameters);
		App.View.construct(parameters);
		if(App.Controller.hasOwnProperty(App.CONTROLLER)) {
			if(App.Controller[App.CONTROLLER].hasOwnProperty("construct"))
				App.Controller[App.CONTROLLER].construct(parameters);
			if(App.Controller[App.CONTROLLER].hasOwnProperty(App.ACTION)) {
				var x = App.Controller[App.CONTROLLER][App.ACTION](parameters);
				if(typeof x == "string") {
					App.Utility.redirect(x);
				}
			} else {
				App.location("error", "action-not-found", [App.CONTROLLER, App.ACTION]);
			}
		} else {
			App.location("error", "controller-not-found", [App.CONTROLLER, App.ACTION]);
		}
	}
}