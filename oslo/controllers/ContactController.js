Oslo.Controller["ContactController"] = {
	"construct": function(parameters) {
		
	},
	"index": function(parameters) {
		mixpanel.track("Contact");
		return Oslo.View.render();
	}
}