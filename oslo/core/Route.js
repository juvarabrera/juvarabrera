Oslo["Route"] = {
	"call": function(dir) {
		var directory = Oslo.Utility.getCAP(dir);
		Oslo.CONTROLLER = directory[0].charAt(0).toUpperCase() + directory[0].slice(1) + "Controller";
		Oslo.ACTION = directory[1];
		var parameters = directory[2];
		Oslo.Controller.construct(parameters);
		Oslo.View.construct(parameters);
		if(Oslo.Controller.hasOwnProperty(Oslo.CONTROLLER)) {
			if(Oslo.Controller[Oslo.CONTROLLER].hasOwnProperty("construct"))
				Oslo.Controller[Oslo.CONTROLLER].construct(parameters);
			if(Oslo.Controller[Oslo.CONTROLLER].hasOwnProperty(Oslo.ACTION)) {
				var x = Oslo.Controller[Oslo.CONTROLLER][Oslo.ACTION](parameters);
				if(typeof x == "string") {
					Oslo.Utility.redirect(x);
				}
			} else {
				Oslo.location("error", "action-not-found", [Oslo.CONTROLLER, Oslo.ACTION]);
			}
		} else {
			Oslo.location("error", "controller-not-found", [Oslo.CONTROLLER, Oslo.ACTION]);
		}
	}
}