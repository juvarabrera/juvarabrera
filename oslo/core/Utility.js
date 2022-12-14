Oslo["Utility"] = {
	getControllerCode: function(c) {
		return c.substring(0, c.length - 10).toLowerCase()
	},
	redirect: function(dir) {
		var directory = this.getCAP(dir);
		Oslo.CONTROLLER = directory[0].charAt(0).toUpperCase() + directory[0].slice(1) + "Controller";
		Oslo.ACTION = directory[1];
		var parameters = directory[2];
		if(parameters == undefined)
			parameters = [];
		Oslo.PARAMETERS = parameters;
		window.location = "#/"+directory[0]+"/"+directory[1]+"/"+parameters.join("/");
	},
	getCAP: function(dir) {
		var directory = dir.substring(1).split("/");
		directory[0] = (directory[0] == "" || directory[0] == undefined) ? Oslo.Constant.DEFAULT_CONTROLLER : directory[0];
		directory[1] = (directory[1] == "" || directory[1] == undefined) ? Oslo.Constant.DEFAULT_ACTION : directory[1];
		directory[2] = directory.splice(2);
		return directory;
	}
}