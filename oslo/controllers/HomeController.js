Oslo.Controller["HomeController"] = {
	"construct": function(parameters) {
		
	},
	"index": function(parameters) {
		mixpanel.track("Home");
		return Oslo.View.render();
	}
}